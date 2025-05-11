export function PhFlag({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-ph-blue"></div>
        <div className="w-1/2 bg-ph-red"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-ph-yellow transform rotate-45"></div>
      </div>
    </div>
  )
}
