interface TreasureChestIconProps {
  className?: string
}

export function TreasureChestIcon({ className = "h-6 w-6" }: TreasureChestIconProps) {
  return (
    <div >
         <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L5 5l4 4"
      />
    </svg>
    </div>
   
  )
}
