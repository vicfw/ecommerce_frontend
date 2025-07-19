export const EmptyBasket = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
  >
    {/* Main basket body */}
    <path
      d="M20 40C20 35.5817 23.5817 32 28 32H92C96.4183 32 100 35.5817 100 40V80C100 84.4183 96.4183 88 92 88H28C23.5817 88 20 84.4183 20 80V40Z"
      fill="#E5E7EB"
      stroke="#D1D5DB"
      strokeWidth="2"
    />

    {/* Basket handle */}
    <path
      d="M35 40C35 37.2386 37.2386 35 40 35H80C82.7614 35 85 37.2386 85 40V45C85 47.7614 82.7614 50 80 50H40C37.2386 50 35 47.7614 35 45V40Z"
      fill="#F3F4F6"
      stroke="#D1D5DB"
      strokeWidth="1"
    />

    {/* Basket pattern lines */}
    <path
      d="M25 50H95"
      stroke="#D1D5DB"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
    <path
      d="M25 60H95"
      stroke="#D1D5DB"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
    <path
      d="M25 70H95"
      stroke="#D1D5DB"
      strokeWidth="1"
      strokeDasharray="2 2"
    />

    {/* Vertical basket lines */}
    <path d="M40 40V80" stroke="#D1D5DB" strokeWidth="1" />
    <path d="M60 40V80" stroke="#D1D5DB" strokeWidth="1" />
    <path d="M80 40V80" stroke="#D1D5DB" strokeWidth="1" />

    {/* Sad face to indicate empty state */}
    <circle cx="45" cy="55" r="2" fill="#9CA3AF" />
    <circle cx="75" cy="55" r="2" fill="#9CA3AF" />
    <path
      d="M50 70Q60 75 70 70"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
