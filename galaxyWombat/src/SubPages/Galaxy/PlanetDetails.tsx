// src/PlanetInfo.tsx
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
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        zIndex: 10,
        width: '300px',
      }}
    >
      <h2>{label}</h2>
      <p>{description}</p>
      <button onClick={onClose} style={{ marginTop: '10px' }}>
        Close
      </button>
    </div>
  );
};

export default PlanetDetails;
