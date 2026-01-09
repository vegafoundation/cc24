/**
 * CC24 Premium SVG Icons
 */
import React from 'react'

interface IconProps {
  size?: number
  color?: string
  style?: React.CSSProperties
}

export const SportsCarIcon: React.FC<IconProps> = ({ size = 120, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size * 0.35} viewBox="0 0 200 70" fill="none" style={style}>
    <path 
      d="M15 52 
         L15 45 Q15 42 18 42 
         L35 42 L45 32 Q50 26 60 24 L85 22 
         Q95 21 105 22 L130 24 Q145 26 155 35 
         L170 42 Q180 42 182 45 L185 48 
         Q188 52 185 55 L180 55 
         Q180 62 170 62 Q160 62 160 55 
         L55 55 
         Q55 62 45 62 Q35 62 35 55 
         L20 55 Q15 55 15 52 Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <circle cx="45" cy="55" r="9" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="45" cy="55" r="5" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="45" cy="55" r="2" fill={color}/>
    <circle cx="170" cy="55" r="9" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="170" cy="55" r="5" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="170" cy="55" r="2" fill={color}/>
    <path d="M55 32 L52 40 L90 40 L85 28 Q80 24 70 24 L60 25 Q55 26 55 32" 
          stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M95 28 L92 40 L140 40 L145 35 Q142 28 130 26 L100 26 Q95 26 95 28" 
          stroke={color} strokeWidth="1.5" fill="none"/>
    <ellipse cx="178" cy="45" rx="4" ry="2" stroke={color} strokeWidth="1" fill="none"/>
    <rect x="17" y="44" width="6" height="3" rx="1" stroke={color} strokeWidth="1" fill="none"/>
    <line x1="100" y1="42" x2="108" y2="42" stroke={color} strokeWidth="1.5"/>
    <path d="M52 34 L48 32 L48 36 Z" fill={color}/>
    <path d="M150 42 L155 42" stroke={color} strokeWidth="1"/>
    <path d="M152 44 L157 44" stroke={color} strokeWidth="1"/>
  </svg>
)

export const AutohausIcon: React.FC<IconProps> = ({ size = 100, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="10" y="35" width="80" height="55" stroke={color} strokeWidth="2" fill="none" rx="2"/>
    <path d="M5 35 L50 10 L95 35" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="15" y="45" width="25" height="40" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
    <rect x="45" y="45" width="25" height="40" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
    <rect x="75" y="55" width="12" height="30" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
    <circle cx="78" cy="70" r="1" fill={color}/>
    <path d="M20 72 L22 68 L30 68 L32 72" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="23" cy="73" r="2" stroke={color} strokeWidth="0.5" fill="none"/>
    <circle cx="31" cy="73" r="2" stroke={color} strokeWidth="0.5" fill="none"/>
    <rect x="35" y="15" width="30" height="12" stroke={color} strokeWidth="1" fill="none" rx="1"/>
    <text x="50" y="24" fontSize="6" fill={color} textAnchor="middle" fontWeight="bold">AUTO</text>
    <line x1="75" y1="10" x2="75" y2="25" stroke={color} strokeWidth="1"/>
    <path d="M75 10 L85 13 L75 16" fill={color} opacity="0.5"/>
  </svg>
)

export const HausIcon: React.FC<IconProps> = ({ size = 100, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="20" y="45" width="60" height="45" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M15 48 L50 20 L85 48" stroke={color} strokeWidth="2.5" fill="none"/>
    <rect x="65" y="25" width="10" height="18" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M70 22 Q68 18 72 15 Q70 12 73 8" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
    <rect x="42" y="60" width="16" height="30" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
    <circle cx="54" cy="77" r="2" fill={color}/>
    <rect x="25" y="55" width="12" height="12" stroke={color} strokeWidth="1.5" fill="none"/>
    <line x1="31" y1="55" x2="31" y2="67" stroke={color} strokeWidth="1"/>
    <line x1="25" y1="61" x2="37" y2="61" stroke={color} strokeWidth="1"/>
    <rect x="63" y="55" width="12" height="12" stroke={color} strokeWidth="1.5" fill="none"/>
    <line x1="69" y1="55" x2="69" y2="67" stroke={color} strokeWidth="1"/>
    <line x1="63" y1="61" x2="75" y2="61" stroke={color} strokeWidth="1"/>
    <circle cx="50" cy="38" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
    <line x1="50" y1="32" x2="50" y2="44" stroke={color} strokeWidth="1"/>
    <line x1="44" y1="38" x2="56" y2="38" stroke={color} strokeWidth="1"/>
    <path d="M10 90 Q20 88 30 90 Q40 92 50 90 Q60 88 70 90 Q80 92 90 90" stroke={color} strokeWidth="1" opacity="0.3"/>
  </svg>
)

export const RoadIcon: React.FC<{ width?: number; color?: string }> = ({ width = 400, color = 'currentColor' }) => (
  <svg width={width} height="30" viewBox={`0 0 ${width} 30`} fill="none">
    <rect x="0" y="8" width={width} height="14" fill={color} opacity="0.2"/>
    {Array.from({ length: Math.ceil(width / 40) }, (_, i) => (
      <rect key={i} x={i * 40 + 10} y="14" width="20" height="2" fill={color} opacity="0.5"/>
    ))}
  </svg>
)
