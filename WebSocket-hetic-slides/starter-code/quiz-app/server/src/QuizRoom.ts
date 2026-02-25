import WebSocket from 'ws'
import type { QuizQuestion, QuizPhase, ServerMessage } from '../../packages/shared-types/index'
import { broadcast } from './utils'

interface Player { id: string; name: string; ws: WebSocket }

export class QuizRoom {
  readonly id: string; 
  readonly code: string
  phase: QuizPhase = 'lobby'
  hostWs: WebSocket | null = null
  players = new Map<string, Player>()
  questions: QuizQuestion[] = [] // Initialisé par défaut
  title = ''
  currentQuestionIndex = -1
  answers = new Map<string, number>()
  scores = new Map<string, number>()
  timerId: ReturnType<typeof setInterval> | null = null
  remaining = 0

  constructor(id: string, code: string) { 
    this.id = id
    this.code = code
    this.questions = [] // Sécurité : toujours un tableau vide au départ
  }

  addPlayer(name: string, ws: WebSocket): string {
    const playerId = Math.random().toString(36).substring(2, 9)
    this.players.set(playerId, { id: playerId, name, ws })
    this.scores.set(playerId, 0)

    this.broadcastToAll({
      type: 'joined',
      playerId: playerId,
      players: Array.from(this.players.values()).map(p => p.name)
    })
    return playerId
  }

  start() { 
    // On ne démarre que si on a des questions
    if (this.phase === 'lobby' && this.questions && this.questions.length > 0) {
      this.nextQuestion()
    } else {
      console.error(`[Room ${this.code}] Impossible de démarrer : pas de questions.`);
    }
  }

  nextQuestion() {
    if (this.timerId) clearInterval(this.timerId)
    this.currentQuestionIndex++

    if (this.currentQuestionIndex >= this.questions.length) {
      this.broadcastLeaderboard()
      return
    }

    this.answers.clear()
    this.phase = 'question'
    const q = this.questions[this.currentQuestionIndex]
    this.remaining = q.timerSec

    const { correctIndex, ...qData } = q
    this.broadcastToAll({ 
      type: 'question', 
      question: qData, 
      index: this.currentQuestionIndex, 
      total: this.questions.length 
    })

    this.timerId = setInterval(() => this.tick(), 1000)
  }

  handleAnswer(pid: string, choice: number) {
    if (this.phase !== 'question' || this.answers.has(pid)) return
    this.answers.set(pid, choice)

    const q = this.questions[this.currentQuestionIndex]
    if (choice === q.correctIndex) {
      const current = this.scores.get(pid) || 0
      const bonus = Math.round(500 * (this.remaining / q.timerSec))
      this.scores.set(pid, current + 1000 + bonus)
    }

    if (this.answers.size === this.players.size) this.timeUp()
  }

  private tick() {
    this.remaining--
    this.broadcastToAll({ type: 'tick', remaining: this.remaining })
    if (this.remaining <= 0) this.timeUp()
  }

  private timeUp() {
    if (this.timerId) { clearInterval(this.timerId); this.timerId = null }
    this.phase = 'results'
    
    const distribution = [0, 0, 0, 0]
    this.answers.forEach(c => distribution[c]++)

    const resScores: Record<string, number> = {}
    this.players.forEach((p, id) => resScores[p.name] = this.scores.get(id) || 0)

    this.broadcastToAll({
      type: 'results',
      correctIndex: this.questions[this.currentQuestionIndex].correctIndex,
      distribution,
      scores: resScores
    })
  }

  private broadcastToAll(msg: ServerMessage) {
    const clients = Array.from(this.players.values()).map(p => p.ws)
    if (this.hostWs) clients.push(this.hostWs)
    broadcast(clients, msg)
  }

  private broadcastLeaderboard() {
    this.phase = 'leaderboard'
    const rankings = Array.from(this.players.entries())
      .map(([id, p]) => ({ name: p.name, score: this.scores.get(id) || 0 }))
      .sort((a, b) => b.score - a.score)
    this.broadcastToAll({ type: 'leaderboard', rankings })
  }

  end() {
    if (this.timerId) clearInterval(this.timerId)
    this.broadcastToAll({ type: 'ended' })
  }
}