'use client'

import { useRef, useState, type KeyboardEvent } from 'react'

const ATTENTIONS = [
  {
    key: 'commander',
    name: 'Commander',
    classical: 'Choleric',
    contribution: 'Direction and ownership',
    crowdsOut: 'Context and consent',
    question: 'What needs to move?',
  },
  {
    key: 'bard',
    name: 'Bard',
    classical: 'Sanguine',
    contribution: 'Energy and invitation',
    crowdsOut: 'Continuity and limits',
    question: 'Why could this matter?',
  },
  {
    key: 'strategist',
    name: 'Strategist',
    classical: 'Melancholic',
    contribution: 'Evidence and clarity',
    crowdsOut: 'Momentum and accessibility',
    question: 'What can I actually see?',
  },
  {
    key: 'guardian',
    name: 'Guardian',
    classical: 'Phlegmatic',
    contribution: 'Steadiness and care',
    crowdsOut: 'Directness and change',
    question: 'What can I genuinely carry?',
  },
] as const

export default function FourTypeCompass() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selected = ATTENTIONS[selectedIndex]

  function moveFocus(nextIndex: number) {
    const normalizedIndex = (nextIndex + ATTENTIONS.length) % ATTENTIONS.length
    setFocusedIndex(normalizedIndex)
    buttonRefs.current[normalizedIndex]?.focus()
  }

  function selectAttention(index: number) {
    setSelectedIndex(index)
    setFocusedIndex(index)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      moveFocus(index + 1)
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(index - 1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      moveFocus(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      moveFocus(ATTENTIONS.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectAttention(index)
    }
  }

  return (
    <div className="field-guide-compass-experience">
      <div className="field-guide-compass" role="radiogroup" aria-label="Choose a FourType attention pattern">
        {ATTENTIONS.map((attention, index) => {
          const isSelected = index === selectedIndex

          return (
            <button
              key={attention.key}
              ref={(element) => { buttonRefs.current[index] = element }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={index === focusedIndex ? 0 : -1}
              className={`field-guide-compass-card ${attention.key}${isSelected ? ' is-selected' : ''}`}
              onClick={() => selectAttention(index)}
              onFocus={() => setFocusedIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="field-guide-compass-label">{attention.name} <span>/ {attention.classical}</span></span>
              <strong>{attention.contribution}</strong>
            </button>
          )
        })}
      </div>

      <section className={`field-guide-compass-detail ${selected.key}`} aria-live="polite" aria-labelledby="selected-attention-title">
        <p className="field-guide-compass-label">{selected.name} <span>/ {selected.classical}</span></p>
        <h3 id="selected-attention-title">{selected.contribution}</h3>
        <dl>
          <div><dt>Useful contribution</dt><dd>{selected.contribution}</dd></div>
          <div><dt>May crowd out</dt><dd>{selected.crowdsOut}</dd></div>
          <div><dt>Widening question</dt><dd>{selected.question}</dd></div>
        </dl>
      </section>
    </div>
  )
}
