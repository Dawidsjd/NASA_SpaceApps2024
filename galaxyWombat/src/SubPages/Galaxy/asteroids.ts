// asteroids.ts

export interface AsteroidData {
  label: string;
  description: string;
  size: number; // Scale for visualization
  color: string;
  speed: number; // Speed of rotation in your application
  distanceFromSun: number; // Distance in AU
}

export const asteroidData: AsteroidData[] = [
  {
    label: 'Apophis',
    size: 0.325,
    color: 'darkgray',
    speed: 0.002,
    distanceFromSun: 1.1, // Example distance in AU, between Earth and Jupiter
    description:
      'Apophis is a near-Earth asteroid that has a chance of impacting Earth in 2029.',
  },
  {
    label: 'Ryugu',
    size: 0.144,
    color: 'lightgray',
    speed: 0.0025,
    distanceFromSun: 1.5, // Closer to Mars
    description:
      'Ryugu is a carbon-rich asteroid that was visited by the Hayabusa2 spacecraft.',
  },
  {
    label: 'Bennu',
    size: 0.16,
    color: 'black',
    speed: 0.002,
    distanceFromSun: 1.8, // Closer to Mars
    description:
      "Bennu is a near-Earth asteroid that is the target of NASA's OSIRIS-REx mission.",
  },
  {
    label: 'Didymos',
    size: 0.15,
    color: 'brown',
    speed: 0.0015,
    distanceFromSun: 2.2, // Closer to Jupiter
    description:
      'Didymos is a binary asteroid system with a larger primary and a smaller secondary.',
  },
  {
    label: 'Braille',
    size: 0.08,
    color: 'gray',
    speed: 0.003,
    distanceFromSun: 2.5, // Closer to Jupiter
    description:
      'Braille is a small asteroid named after the inventor of the Braille system.',
  },
  {
    label: 'Anne Frank',
    size: 0.1,
    color: 'lightyellow',
    speed: 0.002,
    distanceFromSun: 3.0, // Between Earth and Mars
    description:
      'Anne Frank is an asteroid named after the Jewish girl who became an emblem of the Holocaust.',
  },
  {
    label: 'Leucus',
    size: 0.05,
    color: 'silver',
    speed: 0.0022,
    distanceFromSun: 4.0, // Closer to Jupiter
    description: 'Leucus is a small asteroid in the main belt.',
  },
  {
    label: 'Vesta',
    size: 0.33,
    color: 'orange',
    speed: 0.0025,
    distanceFromSun: 0.4, // Closer to Jupiter
    description:
      'Vesta is one of the largest objects in the asteroid belt and is a protoplanet.',
  },
];
