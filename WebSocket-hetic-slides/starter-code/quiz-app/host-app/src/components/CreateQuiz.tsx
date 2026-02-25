// ============================================================
// CreateQuiz - Formulaire de creation d'un quiz
// IMPLEMENTATION : Formulaire dynamique avec React
// ============================================================

import { useState } from 'react'
import type { QuizQuestion } from '@shared/index'

interface CreateQuizProps {
  onSubmit: (title: string, questions: QuizQuestion[]) => void
}

function CreateQuiz({ onSubmit }: CreateQuizProps) {
  // --- States ---
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: Math.random().toString(36).substring(2, 9),
      text: '',
      choices: ['', '', '', ''],
      correctIndex: 0,
      timerSec: 20
    }
  ])

  // --- Handlers pour les questions ---

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Math.random().toString(36).substring(2, 9),
      text: '',
      choices: ['', '', '', ''],
      correctIndex: 0,
      timerSec: 20
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const updateQuestion = (id: string, field: keyof QuizQuestion, value: any) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const updateChoice = (questionId: string, choiceIndex: number, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newChoices = [...q.choices]
        newChoices[choiceIndex] = text
        return { ...q, choices: newChoices }
      }
      return q
    }))
  }

  // --- Validation et Soumission ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple comme vu en cours
    if (!title.trim()) return alert("Le titre du quiz est requis")
    if (questions.some(q => !q.text.trim() || q.choices.some(c => !c.trim()))) {
      return alert("Veuillez remplir toutes les questions et tous les choix")
    }

    onSubmit(title, questions)
  }

  return (
    <div className="phase-container">
      <h1>Créer un Quiz</h1>
      
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre du Quiz</label>
          <input 
            type="text" 
            placeholder="Ex: Quiz JavaScript" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
        </div>

        <div className="questions-list">
          {questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <div className="question-card-header">
                <h3>Question {index + 1}</h3>
                <button 
                  type="button" 
                  className="btn-remove" 
                  onClick={() => removeQuestion(q.id)}
                >
                  Supprimer
                </button>
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Votre question ici..." 
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                />
              </div>

              <div className="choices-inputs">
                {q.choices.map((choice, cIndex) => (
                  <div key={cIndex} className="choice-input-group">
                    <input 
                      type="radio" 
                      name={`correct-${q.id}`} 
                      checked={q.correctIndex === cIndex}
                      onChange={() => updateQuestion(q.id, 'correctIndex', cIndex)}
                    />
                    <input 
                      type="text" 
                      placeholder={`Choix ${cIndex + 1}`} 
                      value={choice}
                      onChange={(e) => updateChoice(q.id, cIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Temps (sec)</label>
                <input 
                  type="number" 
                  min="5" 
                  max="60"
                  value={q.timerSec}
                  onChange={(e) => updateQuestion(q.id, 'timerSec', parseInt(e.target.value))}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="create-actions">
          <button type="button" className="btn-add-question" onClick={addQuestion}>
            + Ajouter une question
          </button>
          
          <button type="submit" className="btn-primary">
            Créer le Quiz
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateQuiz