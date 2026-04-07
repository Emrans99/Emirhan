import { pixelPattern } from '../data/siteData'

export function PixelBadge() {
  return (
    <div className="pixel-badge" aria-hidden="true">
      {pixelPattern.flatMap((row, rowIndex) =>
        row.split('').map((value, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={`pixel-badge__cell ${value === '1' ? 'is-active' : ''}`}
          />
        )),
      )}
    </div>
  )
}
