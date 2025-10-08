import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const CroissantIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 12c0-1.5 1-3 2.5-4 2-1.5 4.5-2 7-1.5 3 .5 5.5 2.5 7 5 1 1.5 1.5 3 1 4.5-.5 2-2 3.5-4 4-2.5.5-5-.5-7-2-1.5-1-2.5-2.5-3-4-.3-1-.8-2-.5-2z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M6 10c.5-.3 1-.5 1.5-.5s1 .2 1.5.5M9 13c.3-.2.7-.3 1-.3s.7.1 1 .3M12 16c.2-.1.4-.2.7-.2s.5.1.7.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

export const BreadIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 10c0-2 1.5-4 4-4h8c2.5 0 4 2 4 4v6c0 1.5-1 3-2.5 3.5H6.5C5 19 4 17.5 4 16v-6z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M6 12h12M6 14h12M6 16h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

export const CupcakeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7 12l1.5 7h7L17 12H7z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M6 12c0-3 2.5-5.5 6-5.5S18 9 18 12"
      fill="currentColor"
      opacity="0.9"
    />
    <circle
      cx="12"
      cy="8"
      r="1.5"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M8 15l1 2M12 14l0 3M16 15l-1 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

export const BaguetteIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 8c0-1 .5-2 1.5-2.5L18 4c1.5-.5 3 0 3.5 1.5s0 3-1.5 3.5L6.5 10.5C5 11 3 10 3 8z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M6 7l2 1M9 6.5l2 1M12 6l2 1M15 5.5l2 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

export const CakeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="4"
      y="12"
      width="16"
      height="8"
      rx="1"
      fill="currentColor"
      opacity="0.8"
    />
    <rect
      x="6"
      y="8"
      width="12"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M9 8V6c0-.5.5-1 1-1s1 .5 1 1v2M13 8V6c0-.5.5-1 1-1s1 .5 1 1v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 16h12M8 18h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

export const PieIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M12 4v8l6 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M8 8c.5-.3 1-.5 1.5-.5M10 14c.3-.2.7-.3 1-.3M14 16c.2-.1.4-.2.7-.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
)

export const WeddingCakeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="16" width="18" height="5" rx="1" fill="currentColor" opacity="0.8" />
    <rect x="6" y="11" width="12" height="6" rx="1" fill="currentColor" opacity="0.9" />
    <rect x="9" y="6" width="6" height="6" rx="1" fill="currentColor" />
    <path
      d="M11 6V4c0-.5.5-1 1-1s1 .5 1 1v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="14" r="0.5" fill="currentColor" opacity="0.6" />
    <circle cx="16" cy="14" r="0.5" fill="currentColor" opacity="0.6" />
    <circle cx="12" cy="9" r="0.5" fill="currentColor" opacity="0.6" />
  </svg>
)

export const ChocolateIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="2"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M8 6v12M12 6v12M16 6v12M4 10h16M4 14h16"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.6"
    />
  </svg>
)

export const WheatIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 20V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 6c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2zM8 10c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2zM8 14c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M14 6c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2zM14 10c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2zM14 14c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
)

export const PlantIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 20v-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 12c0-2 2-4 4-4s4 2 4 4c0 1-1 2-2 2h-4c-1 0-2-1-2-2z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M6 10c0-1.5 1.5-3 3-3s3 1.5 3 3M15 10c0-1.5 1.5-3 3-3s3 1.5 3 3"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
)

export const GlobeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 3c2.5 0 4.5 4 4.5 9s-2 9-4.5 9-4.5-4-4.5-9 2-9 4.5-9z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M3 12h18M5 8h14M5 16h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const ChefHatIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 18h12v2H6v-2z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M12 4c-3 0-5.5 2-6 5 0 2 1 4 3 5h6c2-1 3-3 3-5-.5-3-3-5-6-5z"
      fill="currentColor"
      opacity="0.9"
    />
    <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.6" />
  </svg>
)

export const DocumentIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M14 2v6h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M8 12h8M8 16h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
)

export const SparkleIcon: React.FC<IconProps> = ({ className = "", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z"
      fill="currentColor"
    />
    <circle cx="3" cy="3" r="1" fill="currentColor" opacity="0.7" />
    <circle cx="13" cy="4" r="0.5" fill="currentColor" opacity="0.7" />
    <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.7" />
  </svg>
)