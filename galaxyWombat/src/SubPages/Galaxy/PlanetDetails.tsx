import React, { useEffect, useRef } from 'react';

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
  const popupRef = useRef<HTMLDivElement | null>(null); // Referencja do kontenera popupu

  useEffect(() => {
    // Funkcja do obsługi naciśnięcia klawisza
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(); // Zamknij popup przy naciśnięciu Escape
      }
    };

    // Funkcja do obsługi kliknięcia poza popup
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose(); // Zamknij popup, jeśli kliknięto poza
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Usunięcie nasłuchiwacza
      document.removeEventListener('mousedown', handleClickOutside); // Usunięcie nasłuchiwacza
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      style={{
        position: 'absolute',
        top: 100,
        left: 10,
        border: '1px solid blue',
        background: 'gray',
        color: 'white',
        padding: '10px',
        zIndex: 1000,
      }}
    >
      <h2>{label}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PlanetDetails;
