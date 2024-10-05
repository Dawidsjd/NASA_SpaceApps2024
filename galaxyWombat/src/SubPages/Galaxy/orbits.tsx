// src/orbits.ts
export interface PlanetData {
  label: string;
  lambda: number; // λ (arcsec)
  phi: number; // φ (arcsec)
  rho: number; // ρ (1000 km)
  size: number; // Relative size of the planet
  color: string; // Color for the planet
  speed: number; // Orbital speed (radians/second)
}

export const planetData: PlanetData[] = [
  {
    label: 'Mercury',
    lambda: 15,
    phi: 1,
    rho: 0.05,
    size: 0.383,
    color: 'gray',
    speed: 0.047, // Prędkość orbitalna (w radianach na sekundę)
  },
  {
    label: 'Venus',
    lambda: 20,
    phi: 1,
    rho: 0.1,
    size: 0.949,
    color: 'yellow',
    speed: 0.035,
  },
  {
    label: 'Earth/Moon Barycenter',
    lambda: 20,
    phi: 8,
    rho: 0.15,
    size: 1.0,
    color: 'blue',
    speed: 0.03,
  },
  {
    label: 'Mars',
    lambda: 40,
    phi: 2,
    rho: 0.2,
    size: 0.532,
    color: 'red',
    speed: 0.024,
  },
  {
    label: 'Jupiter',
    lambda: 400,
    phi: 10,
    rho: 0.5,
    size: 11.21,
    color: 'orange',
    speed: 0.013,
  },
  {
    label: 'Saturn',
    lambda: 600,
    phi: 25,
    rho: 0.9,
    size: 9.45,
    color: 'lightyellow',
    speed: 0.009,
  },
  {
    label: 'Uranus',
    lambda: 50,
    phi: 2,
    rho: 1.3,
    size: 4.01,
    color: 'lightblue',
    speed: 0.007,
  },
  {
    label: 'Neptune',
    lambda: 10,
    phi: 1,
    rho: 1.7,
    size: 3.88,
    color: 'darkblue',
    speed: 0.005,
  },
];
