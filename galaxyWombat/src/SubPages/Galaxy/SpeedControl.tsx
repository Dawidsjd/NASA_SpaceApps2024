// SpeedControl.tsx
import React from 'react';

interface SpeedControlProps {
  speedMultiplier: number;
  onChange: (value: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({
  speedMultiplier,
  onChange,
}) => {
  return (
    <div
      style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}
    >
      <label style={{ color: 'white', marginRight: '5px' }}>
        Speed Control: {speedMultiplier}
      </label>
      <input
        type="range"
        min="0"
        max="10" // Adjust max value as necessary
        step="1"
        value={speedMultiplier}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default SpeedControl;
