import { useEffect, useEffectEvent, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Gamepad2, RotateCcw } from 'lucide-react'
import { l, type Locale, type LocalizedText } from '../data/siteData'

type Point = {
  x: number
  y: number
}

type ModuleNode = Point & {
  id: string
  label: string
}

const BOARD_SIZE = 8
const START_POINT: Point = { x: 0, y: 7 }
const moduleNodes: ModuleNode[] = [
  { id: 'python', label: 'PY', x: 1, y: 1 },
  { id: 'mfiles', label: 'MF', x: 6, y: 1 },
  { id: 'cloudoffix', label: 'CO', x: 2, y: 5 },
  { id: 'ui', label: 'UI', x: 6, y: 4 },
]

function pick(locale: Locale, value: LocalizedText) {
  return value[locale]
}

export function SignalRun({ locale }: { locale: Locale }) {
  const [player, setPlayer] = useState<Point>(START_POINT)
  const [moves, setMoves] = useState(0)
  const [collected, setCollected] = useState<string[]>([])

  const movePlayer = (dx: number, dy: number) => {
    setPlayer((current) => {
      const next = {
        x: Math.min(BOARD_SIZE - 1, Math.max(0, current.x + dx)),
        y: Math.min(BOARD_SIZE - 1, Math.max(0, current.y + dy)),
      }

      if (next.x === current.x && next.y === current.y) {
        return current
      }

      setMoves((count) => count + 1)

      const target = moduleNodes.find((node) => node.x === next.x && node.y === next.y)

      if (target) {
        setCollected((currentCollected) =>
          currentCollected.includes(target.id) ? currentCollected : [...currentCollected, target.id],
        )
      }

      return next
    })
  }

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
      event.preventDefault()
      movePlayer(0, -1)
    }

    if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
      event.preventDefault()
      movePlayer(0, 1)
    }

    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
      event.preventDefault()
      movePlayer(-1, 0)
    }

    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
      event.preventDefault()
      movePlayer(1, 0)
    }
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      handleKeyDown(event)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const completed = collected.length === moduleNodes.length

  const resetBoard = () => {
    setPlayer(START_POINT)
    setMoves(0)
    setCollected([])
  }

  return (
    <article className="arcade-card tilt-card reveal">
      <div className="arcade-card__header">
        <span className="eyebrow">
          <Gamepad2 size={14} />
          {pick(locale, l('Signal Run', 'Signal Run'))}
        </span>
        <h3>{pick(locale, l('Mini grid görevi', 'Mini grid task'))}</h3>
      </div>

      <div className="arcade-board" role="img" aria-label={pick(locale, l('Signal Run oyun alanı', 'Signal Run board'))}>
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
          const x = index % BOARD_SIZE
          const y = Math.floor(index / BOARD_SIZE)
          const isPlayer = player.x === x && player.y === y
          const moduleNode = moduleNodes.find((node) => node.x === x && node.y === y)
          const isCollected = moduleNode ? collected.includes(moduleNode.id) : false

          return (
            <div
              key={`${x}-${y}`}
              className={`arcade-cell ${isPlayer ? 'is-player' : ''} ${moduleNode ? 'is-module' : ''} ${
                isCollected ? 'is-collected' : ''
              }`}
            >
              {isPlayer ? 'EG' : !isCollected && moduleNode ? moduleNode.label : ''}
            </div>
          )
        })}
      </div>

      <div className="arcade-status">
        <span>
          {pick(locale, l('Toplanan modül', 'Collected modules'))}: {collected.length} / {moduleNodes.length}
        </span>
        <span>
          {pick(locale, l('Hamle', 'Moves'))}: {moves}
        </span>
      </div>

      <div className="arcade-controls" aria-label={pick(locale, l('Yön kontrolleri', 'Directional controls'))}>
        <button type="button" onClick={() => movePlayer(0, -1)} aria-label={pick(locale, l('Yukarı', 'Up'))}>
          <ArrowUp size={15} />
        </button>
        <div className="arcade-controls__row">
          <button type="button" onClick={() => movePlayer(-1, 0)} aria-label={pick(locale, l('Sol', 'Left'))}>
            <ArrowLeft size={15} />
          </button>
          <button type="button" onClick={() => movePlayer(0, 1)} aria-label={pick(locale, l('Aşağı', 'Down'))}>
            <ArrowDown size={15} />
          </button>
          <button type="button" onClick={() => movePlayer(1, 0)} aria-label={pick(locale, l('Sağ', 'Right'))}>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <button type="button" className="arcade-reset magnetic" onClick={resetBoard}>
        <RotateCcw size={15} />
        {pick(locale, l('Sıfırla', 'Reset'))}
      </button>

      {completed ? (
        <div className="arcade-success">
          {pick(
            locale,
            l(
              'Easter egg açıldı: teknik tarafı ciddiye alırken deneyimi canlı tutmayı seven bir profil.',
              'Easter egg unlocked: a profile that takes the technical side seriously while keeping the experience alive.',
            ),
          )}
        </div>
      ) : null}
    </article>
  )
}
