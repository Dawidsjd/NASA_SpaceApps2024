export interface PlanetData {
  label: string;
  description: string;
  lambda: number;
  phi: number;
  rho: number;
  size: number;
  color: string;
  speed: number;
  texture: string; // Nowe pole do ścieżki tekstury
}

export const planetData: PlanetData[] = [
  {
    label: 'Mercury',
    lambda: 15,
    phi: 1,
    rho: 0.05,
    size: 0.383,
    color: 'gray',
    texture: '/assets/mercury.jpg',
    speed: 0.0235, // 0.047 decreased by 50%
    description:
      'Mercury is the closest planet to the Sun and the smallest planet in the Solar System.',
  },
  {
    label: 'Venus',
    lambda: 20,
    phi: 1,
    rho: 0.1,
    size: 0.949,
    color: 'yellow',
    texture: '/assets/venus.jpg',
    speed: 0.0175, // 0.035 decreased by 50%
    description:
      'Venus is the second planet from the Sun and is similar in structure to Earth.',
  },
  {
    label: 'Earth',
    lambda: 20,
    phi: 8,
    rho: 0.15,
    size: 1.0,
    color: 'blue',
    texture: '/assets/earth.jpg',
    speed: 0.015, // 0.03 decreased by 50%
    description:
      'Earth is the third planet from the Sun and the only astronomical object known to support life.',
  },
  {
    label: 'Mars',
    lambda: 40,
    phi: 2,
    rho: 0.2,
    size: 0.532,
    color: 'red',
    texture: '/assets/mars.jpg',
    speed: 0.012, // 0.024 decreased by 50%
    description:
      'Mars is the fourth planet from the Sun and is often called the "Red Planet".',
  },
  {
    label: 'Jupiter',
    lambda: 400,
    phi: 10,
    rho: 0.5,
    size: 11.21,
    color: 'orange',
    texture: '/assets/jupiter.jpg',
    speed: 0.0065, // 0.013 decreased by 50%
    description:
      'Jupiter is the fifth planet from the Sun and the largest planet in the Solar System.',
  },
  {
    label: 'Saturn',
    lambda: 600,
    phi: 25,
    rho: 0.9,
    size: 9.45,
    color: 'lightyellow',
    texture: '/assets/saturn.jpg',
    speed: 0.0045, // 0.009 decreased by 50%
    description:
      'Saturn is the sixth planet from the Sun and is known for its stunning rings.',
  },
  {
    label: 'Uranus',
    lambda: 50,
    phi: 2,
    rho: 1.3,
    size: 4.01,
    color: 'lightblue',
    texture: '/assets/uranus.jpg',
    speed: 0.0035, // 0.007 decreased by 50%
    description:
      'Uranus is the seventh planet from the Sun and is unique for its sideways rotation.',
  },
  {
    label: 'Neptune',
    lambda: 10,
    phi: 1,
    rho: 1.8,
    size: 3.88,
    color: 'darkblue',
    texture: '/assets/neptune.jpg',
    speed: 0.0025, // 0.005 decreased by 50%
    description:
      'Neptune is the eighth and farthest planet from the Sun in the Solar System.',
  },
];
