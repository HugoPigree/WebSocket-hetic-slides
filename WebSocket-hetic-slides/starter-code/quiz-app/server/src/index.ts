import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import type { ClientMessage } from '../../packages/shared-types/index'
import { QuizRoom } from './QuizRoom'
import { send, generateQuizCode } from './utils'

const PORT = 3001
const rooms = new Map<string, QuizRoom>()
const clientRoomMap = new Map<WebSocket, { room: QuizRoom; playerId: string }>()
const hostRoomMap = new Map<WebSocket, QuizRoom>()

const httpServer = createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Quiz WebSocket Server is running')
})

const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (raw: Buffer) => {
    let message: ClientMessage
    try {
      message = JSON.parse(raw.toString()) as ClientMessage
    } catch { return }

    switch (message.type) {
      case 'join': {
        const room = rooms.get(message.quizCode)
        if (!room || room.phase !== 'lobby') {
          send(ws, { type: 'error', message: 'Impossible de rejoindre la salle' })
          break
        }
        const playerId = room.addPlayer(message.name, ws)
        clientRoomMap.set(ws, { room, playerId })
        break
      }

      case 'answer': {
        const clientData = clientRoomMap.get(ws)
        if (clientData) {
          clientData.room.handleAnswer(clientData.playerId, message.choiceIndex)
        }
        break
      }

      case 'host:create': {
        const code = generateQuizCode()
        const newRoom = new QuizRoom(uuidv4(), code)
        newRoom.hostWs = ws
        
        // Vérification de sécurité pour les questions
        if (!message.questions || !Array.isArray(message.questions)) {
          console.error("[Server] Erreur : Le Host a envoyé un quiz sans questions valides.");
          send(ws, { type: 'error', message: 'Erreur: Le quiz doit contenir des questions.' });
          break;
        }

        newRoom.title = message.title
        newRoom.questions = message.questions
        
        rooms.set(code, newRoom)
        hostRoomMap.set(ws, newRoom)
        
        send(ws, { type: 'sync', phase: 'lobby', data: { quizCode: code } })
        console.log(`[Server] Quiz créé : ${code} (${message.questions.length} questions)`)
        break
      }

      case 'host:start':
        hostRoomMap.get(ws)?.start()
        break

      case 'host:next':
        hostRoomMap.get(ws)?.nextQuestion()
        break
    }
  })

  ws.on('close', () => {
    const room = hostRoomMap.get(ws)
    if (room) rooms.delete(room.code)
    hostRoomMap.delete(ws)
    clientRoomMap.delete(ws)
  })
})

httpServer.listen(PORT, () => console.log(`[Server] Prêt sur le port ${PORT}`))