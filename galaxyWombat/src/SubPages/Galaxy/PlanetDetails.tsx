// src/PlanetDetails.tsx
import React from 'react';

interface PlanetDetailsProps {
  label: string;
  description: string;
  onClose: () => void;
}

const PlanetDetails: React.FC<PlanetDetailsProps> = ({
  label,
  description,
  onClose,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        border: '1px solid blue',
        background: 'gray',
        color: 'white',
        padding: '10px',
      }}
    >
      <h2>{label}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PlanetDetails;
