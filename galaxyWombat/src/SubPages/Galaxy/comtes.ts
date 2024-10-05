// src/comets.ts
export interface CometData {
  name: string;
  eccentricity: number;
  semiMajorAxis: number; // w AU
  inclination: number; // w stopniach
  period: number; // w dniach
  color: string;
}

export const cometData: CometData[] = [
  {
    name: "Halley's Comet",
    eccentricity: 0.967,
    semiMajorAxis: 17.8,
    inclination: 162.3,
    period: 75.3,
    color: 'white',
  },
  {
    name: 'Hale-Bopp',
    eccentricity: 0.995,
    semiMajorAxis: 1985.0,
    inclination: 89.0,
    period: 2532.0,
    color: 'lightgray',
  },
  {
    name: 'Swift-Tuttle',
    eccentricity: 0.998,
    semiMajorAxis: 133.0,
    inclination: 13.2,
    period: 133.3,
    color: 'lightyellow',
  },
  {
    name: "Encke's Comet",
    eccentricity: 0.849,
    semiMajorAxis: 6.46,
    inclination: 22.0,
    period: 120.0,
    color: 'yellow',
  },
  {
    name: "Biela's Comet",
    eccentricity: 0.75,
    semiMajorAxis: 6.6,
    inclination: 22.6,
    period: 6.6,
    color: 'orange',
  },
  {
    name: 'Lovejoy',
    eccentricity: 0.9998,
    semiMajorAxis: 550.0,
    inclination: 30.0,
    period: 8000.0,
    color: 'pink',
  },
  {
    name: 'Neowise',
    eccentricity: 0.9999,
    semiMajorAxis: 6215.0,
    inclination: 43.0,
    period: 6775.0,
    color: 'blue',
  },
  {
    name: 'Pan-STARRS',
    eccentricity: 0.9999,
    semiMajorAxis: 1368.0,
    inclination: 65.0,
    period: 11000.0,
    color: 'cyan',
  },
  {
    name: 'C/2014 Q2 (Lovejoy)',
    eccentricity: 0.999,
    semiMajorAxis: 19500.0,
    inclination: 90.0,
    period: 13000.0,
    color: 'violet',
  },
  {
    name: 'C/2016 R2 (PANSTARRS)',
    eccentricity: 0.998,
    semiMajorAxis: 10800.0,
    inclination: 70.0,
    period: 8000.0,
    color: 'lightblue',
  },
  {
    name: 'C/2020 F3 (NEOWISE)',
    eccentricity: 0.9998,
    semiMajorAxis: 2340.0,
    inclination: 45.0,
    period: 6700.0,
    color: 'yellowgreen',
  },
];
