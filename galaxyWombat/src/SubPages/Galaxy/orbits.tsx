// src/orbits.ts
export interface PlanetData {
  label: string;
  description: string; // Dodajemy pole description
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
    description:
      'Mercury is the closest planet to the Sun and the smallest in the Solar System.',
    lambda: 15,
    phi: 1,
    rho: 0.05,
    size: 0.383,
    color: 'gray',
    speed: 0.047, // Orbital speed (in radians per second)
  },
  {
    label: 'Venus',
    description:
      'Venus is the second planet from the Sun and is similar in size to Earth.',
    lambda: 20,
    phi: 1,
    rho: 0.1,
    size: 0.949,
    color: 'yellow',
    speed: 0.035,
  },
  {
    label: 'Earth',
    description:
      'Earth is the third planet from the Sun and the only astronomical object known to harbor life.',
    lambda: 20,
    phi: 8,
    rho: 0.15,
    size: 1.0,
    color: 'blue',
    speed: 0.03,
  },
  {
    label: 'Mars',
    description:
      'Mars is the fourth planet from the Sun and is often referred to as the "Red Planet".',
    lambda: 40,
    phi: 2,
    rho: 0.2,
    size: 0.532,
    color: 'red',
    speed: 0.024,
  },
  {
    label: 'Jupiter',
    description:
      'Jupiter is the fifth planet from the Sun and the largest in the Solar System.',
    lambda: 400,
    phi: 10,
    rho: 0.5,
    size: 11.21,
    color: 'orange',
    speed: 0.013,
  },
  {
    label: 'Saturn',
    description:
      'Saturn is the sixth planet from the Sun and is known for its prominent ring system.',
    lambda: 600,
    phi: 25,
    rho: 0.9,
    size: 9.45,
    color: 'lightyellow',
    speed: 0.009,
  },
  {
    label: 'Uranus',
    description:
      'Uranus is the seventh planet from the Sun and is unique for its tilt and blue color.',
    lambda: 50,
    phi: 2,
    rho: 1.3,
    size: 4.01,
    color: 'lightblue',
    speed: 0.007,
  },
  {
    label: 'Neptune',
    description:
      'Neptune is the eighth and farthest planet from the Sun in our solar system.',
    lambda: 10,
    phi: 1,
    rho: 1.7,
    size: 3.88,
    color: 'darkblue',
    speed: 0.005,
  },
];
