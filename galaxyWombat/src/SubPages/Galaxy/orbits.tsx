export interface PlanetData {
  label: string;
  description: string;
  lambda: number;
  phi: number;
  rho: number;
  size: number;
  color: string;
  speed: number;
  rotationSpeed: number;
  texture: string;
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
    speed: 0.0235,
    rotationSpeed: 0.000003229,
    description:
      "Distance from the Sun: Closest planet to the Sun (~58 million km / 36 million miles).\nSize: Smallest planet in the Solar System.\nSurface: Rocky, cratered, and similar to Earth's Moon.",
  },
  {
    label: 'Venus',
    lambda: 20,
    phi: 1,
    rho: 0.1,
    size: 0.949,
    color: 'yellow',
    texture: '/assets/venus.jpg',
    speed: 0.0175,
    rotationSpeed: -0.000001016,
    description:
      'Distance from the Sun: Second planet from the Sun (~108 million km / 67 million miles).\nSize: Similar to Earth in size and mass.\n Surface: Volcanic and covered with thick clouds of sulfuric acid.',
  },
  {
    label: 'Earth',
    lambda: 20,
    phi: 8,
    rho: 0.15,
    size: 1.0,
    color: 'blue',
    texture: '/assets/earth.jpg',
    speed: 0.015,
    rotationSpeed: 0.00043931,
    description:
      'Distance from the Sun: Third planet from the Sun (~150 million km / 93 million miles).\nSize: Fifth largest planet in the Solar System.\nSurface: 70% covered by oceans, with varied landscapes.',
  },
  {
    label: 'Mars',
    lambda: 40,
    phi: 2,
    rho: 0.2,
    size: 0.532,
    color: 'red',
    texture: '/assets/mars.jpg',
    speed: 0.012,
    rotationSpeed: 0.00042416,
    description:
      'Distance from the Sun: Fourth planet from the Sun (~227 million km / 141 million miles).\nSize: Second smallest planet in the Solar System.\nSurface: Rocky and dusty, with a thin atmosphere composed mainly of carbon dioxide, and features like volcanoes, valleys, and polar ice caps.',
  },
  {
    label: 'Jupiter',
    lambda: 400,
    phi: 10,
    rho: 0.5,
    size: 11.21,
    color: 'orange',
    texture: '/assets/jupiter.jpg',
    speed: 0.0065,
    rotationSpeed: 0.0006492,
    description:
      'Distance from the Sun: Fifth planet from the Sun (~778 million km / 484 million miles).\nSize: Largest planet in the Solar System.\nSurface: Gas giant, mostly hydrogen and helium, with no solid surface.',
  },
  {
    label: 'Saturn',
    lambda: 600,
    phi: 25,
    rho: 0.9,
    size: 9.45,
    color: 'lightyellow',
    texture: '/assets/saturn.jpg',
    speed: 0.0045,
    rotationSpeed: 0.0005865,
    description:
      'Distance from the Sun: Sixth planet from the Sun (~1.43 billion km / 886 million miles).\nSize: Second largest planet in the Solar System.\nSurface: Gas giant, primarily hydrogen and helium, with a famous ring system.',
  },
  {
    label: 'Uranus',
    lambda: 50,
    phi: 2,
    rho: 1.3,
    size: 4.01,
    color: 'lightblue',
    texture: '/assets/uranus.jpg',
    speed: 0.0035,
    rotationSpeed: -0.0003651,
    description:
      'Distance from the Sun: Closest planet to the Sun (~58 million km / 36 million miles). Size: Smallest planet in the Solar System. Surface: Rocky, cratered, and similar to Earths Moon. Temperature: Extreme temperatures, from very hot (430°C/800°F) during the day to very cold (-180°C/-290°F) at night. Atmosphere: Almost no atmosphere, mainly thin traces of oxygen, sodium, and hydrogen.',
  },
  {
    label: 'Neptune',
    lambda: 10,
    phi: 1,
    rho: 1.8,
    size: 3.88,
    color: 'darkblue',
    texture: '/assets/neptune.jpg',
    speed: 0.0025,
    rotationSpeed: 0.0003936,
    description:
      'Distance from the Sun: Eighth planet from the Sun (~4.5 billion km / 2.8 billion miles).\nSize: Slightly smaller than Uranus but more massive.\nSurface: Ice giant, with a composition similar to Uranus, made of hydrogen, helium, and methane.',
  },
];
