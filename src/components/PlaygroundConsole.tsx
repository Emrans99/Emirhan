import { useMemo, useState } from 'react'
import { ArrowRight, TerminalSquare } from 'lucide-react'
import { l, terminalResponses, type Locale, type LocalizedText } from '../data/siteData'

type ConsoleEntry = {
  kind: 'input' | 'output'
  text: string
}

const quickCommands = ['help', 'me', 'mechsoft', 'projects']

function pick(locale: Locale, value: LocalizedText) {
  return value[locale]
}

function initialEntries(locale: Locale): ConsoleEntry[] {
  return [{ kind: 'output', text: pick(locale, terminalResponses.boot) }]
}

export function PlaygroundConsole({ locale }: { locale: Locale }) {
  const [input, setInput] = useState('')
  const [entries, setEntries] = useState<ConsoleEntry[]>(() => initialEntries(locale))

  const commandMap = useMemo(
    () => ({
      help: pick(locale, terminalResponses.help),
      me: pick(locale, terminalResponses.me),
      mechsoft: pick(locale, terminalResponses.mechsoft),
      stack: pick(locale, terminalResponses.stack),
      projects: pick(locale, terminalResponses.projects),
      mail: pick(locale, terminalResponses.mail),
    }),
    [locale],
  )

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase()

    if (!command) {
      return
    }

    if (command === 'clear') {
      setEntries(initialEntries(locale))
      setInput('')
      return
    }

    setEntries((current) => [
      ...current,
      { kind: 'input', text: `> ${command}` },
      {
        kind: 'output',
        text: commandMap[command as keyof typeof commandMap] ?? pick(locale, terminalResponses.unknown),
      },
    ])
    setInput('')
  }

  return (
    <article className="console-card tilt-card reveal">
      <div className="console-card__header">
        <div>
          <span className="eyebrow">
            <TerminalSquare size={14} />
            {pick(locale, l('Signal Console', 'Signal Console'))}
          </span>
          <h3>{pick(locale, l('Komutlarla kısa yol', 'Shortcut via commands'))}</h3>
        </div>
      </div>

      <div className="console-output" aria-live="polite">
        {entries.map((entry, index) => (
          <div
            key={`${entry.kind}-${index}`}
            className={`console-line console-line--${entry.kind}`}
          >
            {entry.text}
          </div>
        ))}
      </div>

      <div className="console-quick">
        {quickCommands.map((command) => (
          <button
            key={command}
            type="button"
            className="console-chip"
            onClick={() => {
              runCommand(command)
            }}
          >
            {command}
          </button>
        ))}
      </div>

      <form
        className="console-form"
        onSubmit={(event) => {
          event.preventDefault()
          runCommand(input)
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={pick(locale, l('Komut yaz...', 'Type a command...'))}
          aria-label={pick(locale, l('Komut girişi', 'Command input'))}
        />
        <button type="submit" className="console-submit magnetic">
          <ArrowRight size={16} />
        </button>
      </form>
    </article>
  )
}
