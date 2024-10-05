import React from 'react'

interface SpeedControlProps {
  speedMultiplier: number
  onChange: (value: number) => void
}

const SpeedControl: React.FC<SpeedControlProps> = ({
  speedMultiplier,
  onChange,
}) => {
  return (
    <div className="absolute top-5 left-5 z-10 bg-gray-800 p-4 rounded-lg shadow-lg opacity-55 hover:opacity-100 transition">
      <label htmlFor="speed-control" className="block text-white mb-2 font-medium">
        Speed Control: {speedMultiplier.toFixed(1)}x
      </label>
      <input
        id="speed-control"
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={speedMultiplier}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>0x</span>
        <span>5x</span>
        <span>10x</span>
      </div>
    </div>
  )
}

export default SpeedControl