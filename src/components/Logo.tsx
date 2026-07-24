"use client";

/**
 * Official Jahangirnagar Air International (JAI) brand lockup.
 *
 * Faithful vector reconstruction of the supplied logo: navy "JAI" letterforms,
 * a rising sky-blue flight swoosh terminating in a jet silhouette, and the
 * ruled "JAHANGIRNAGAR / AIR INTERNATIONAL" wordmark. Brand colors are kept
 * exactly as the official mark — navy #0A2A66 and sky blue #1E9BE0 — and the
 * mark is never recoloured; legibility on dark stages is handled by the
 * frosted-white <LogoPlate/>, never by tinting the logo itself.
 */

const NAVY = "#0A2A66";
const BLUE = "#1E9BE0";

export function JaiLogo({
  withWordmark = true,
  className = "",
  title = "Jahangirnagar Air International",
}: {
  withWordmark?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={withWordmark ? "0 0 520 330" : "0 0 520 224"}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="jaiNavy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E327A" />
          <stop offset="100%" stopColor={NAVY} />
        </linearGradient>
        <linearGradient id="jaiI" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={NAVY} />
          <stop offset="55%" stopColor="#0E5FAE" />
          <stop offset="100%" stopColor={BLUE} />
        </linearGradient>
        <linearGradient id="jaiSwoosh" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#2AA7E8" />
          <stop offset="55%" stopColor="#1380CF" />
          <stop offset="100%" stopColor="#0A5BA6" />
        </linearGradient>
      </defs>

      {/* ---- J ---- */}
      <path
        d="M150 30 L200 30 L200 150 C200 196 168 212 122 212 C82 212 56 196 50 166 L96 156 C100 172 110 180 124 180 C142 180 150 170 150 150 Z"
        fill="url(#jaiNavy)"
      />

      {/* ---- A (with crossbar + triangular counter) ---- */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M300 25 L382 210 L332 210 L316 172 L284 172 L268 210 L218 210 Z M300 96 L290 142 L310 142 Z"
        fill="url(#jaiNavy)"
      />

      {/* ---- I (two-tone) ---- */}
      <rect x="402" y="25" width="52" height="185" fill="url(#jaiI)" />

      {/* ---- rising flight swoosh (in front of letter bases) ---- */}
      <path
        d="M64 202 C150 220 300 188 486 64 C320 150 170 200 64 186 Z"
        fill="url(#jaiSwoosh)"
      />

      {/* ---- jet silhouette at the apex of the swoosh ---- */}
      <g transform="translate(470 30) rotate(38 15 19) scale(1.02)" fill={NAVY}>
        <path d="M15,0 C17.5,0 18.6,3 18.6,8 L18.6,15 L31,21 L31,25 L18.6,21 L18.6,31 L24,34 L24,37.6 L15,35 L6,37.6 L6,34 L11.4,31 L11.4,21 L-1,25 L-1,21 L11.4,15 L11.4,8 C11.4,3 12.5,0 15,0 Z" />
      </g>

      {withWordmark && (
        <g>
          <text
            x="260"
            y="272"
            textAnchor="middle"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight={800}
            fontSize="44"
            letterSpacing="5"
            fill={NAVY}
          >
            JAHANGIRNAGAR
          </text>
          <rect x="40" y="300" width="62" height="2.4" fill={NAVY} />
          <rect x="418" y="300" width="62" height="2.4" fill={NAVY} />
          <text
            x="260"
            y="308"
            textAnchor="middle"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight={600}
            fontSize="15"
            letterSpacing="6"
            fill={BLUE}
          >
            AIR INTERNATIONAL
          </text>
        </g>
      )}
    </svg>
  );
}

export default JaiLogo;
