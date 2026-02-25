import { useState, useEffect, useRef } from 'react'
import { useWebSocket } from './hooks/useWebSocket'
// Import relatif pour corriger l'erreur "@shared not found"
import type { QuizPhase, QuizQuestion, ServerMessage } from '../../packages/shared-types/index'
import JoinScreen from './components/JoinScreen'
import WaitingLobby from './components/WaitingLobby'
import AnswerScreen from './components/AnswerScreen'
import FeedbackScreen from './components/FeedbackScreen'
import ScoreScreen from './components/ScoreScreen'

const WS_URL = 'ws://localhost:3001'

function App() {
  const { status, sendMessage, lastMessage } = useWebSocket(WS_URL)
  const [phase, setPhase] = useState<QuizPhase | 'join' | 'feedback'>('join')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Omit<QuizQuestion, 'correctIndex'> | null>(null)
  const [remaining, setRemaining] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [rankings, setRankings] = useState<{ name: string; score: number }[]>([])
  const [error, setError] = useState<string | undefined>()
  
  const selectedChoice = useRef<number | null>(null)

  useEffect(() => {
    if (!lastMessage) return
    const msg = lastMessage as ServerMessage

    switch (msg.type) {
      case 'joined':
        setPlayers(msg.players)
        setPhase('lobby')
        break
      case 'question':
        setCurrentQuestion(msg.question)
        setRemaining(msg.question.timerSec)
        setHasAnswered(false)
        selectedChoice.current = null
        setPhase('question')
        break
      case 'tick':
        setRemaining(msg.remaining)
        break
      case 'results':
        setLastCorrect(selectedChoice.current === msg.correctIndex)
        if (msg.scores[playerName] !== undefined) setScore(msg.scores[playerName])
        setPhase('feedback')
        break
      case 'leaderboard':
        setRankings(msg.rankings)
        setPhase('leaderboard')
        break
      case 'error':
        setError(msg.message)
        break
    }
  }, [lastMessage, playerName])

  const handleJoin = (code: string, name: string) => {
    setPlayerName(name)
    sendMessage({ type: 'join', quizCode: code, name })
  }

  const handleAnswer = (index: number) => {
    if (hasAnswered || !currentQuestion) return
    setHasAnswered(true)
    selectedChoice.current = index
    // Ajout de questionId requis par l'interface ClientMessage
    sendMessage({ 
      type: 'answer', 
      questionId: currentQuestion.id, 
      choiceIndex: index 
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h2>Quiz Player</h2>
          <span className={`status-badge status-${status}`}>
            {status === 'connected' ? '● Connecté' : '○ Déconnecté'}
          </span>
        </div>
      </header>
      <main className="app-main">
        {phase === 'join' && <JoinScreen onJoin={handleJoin} error={error} />}
        {phase === 'lobby' && <WaitingLobby players={players} />}
        {phase === 'question' && currentQuestion && (
          <AnswerScreen question={currentQuestion} remaining={remaining} onAnswer={handleAnswer} hasAnswered={hasAnswered} />
        )}
        {(phase === 'feedback' || phase === 'results') && <FeedbackScreen correct={lastCorrect} score={score} />}
        {phase === 'leaderboard' && <ScoreScreen rankings={rankings} playerName={playerName} />}
      </main>
    </div>
  )
}

export default App