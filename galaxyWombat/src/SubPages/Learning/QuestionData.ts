interface Question {
  question: string;
  answers: { text: string; isCorrect: boolean }[];
}

export const techQuestions: { [planet: string]: Question[] } = {
  Mercury: [
    {
      question:
        'What is the primary mission of the Messenger space probe on Mercury?',
      answers: [
        { text: 'Studying Mercury’s surface', isCorrect: true },
        { text: 'Searching for water on Mercury', isCorrect: false },
        { text: 'Studying Mercury’s atmosphere', isCorrect: false },
      ],
    },
    {
      question: 'Why is Mercury difficult to observe from Earth?',
      answers: [
        { text: 'It is too close to the Sun', isCorrect: true },
        { text: 'It has a strong atmosphere', isCorrect: false },
        { text: 'It is too far away', isCorrect: false },
      ],
    },
    {
      question: 'Which technology is crucial for studying Mercury?',
      answers: [
        { text: 'Thermal insulation technology', isCorrect: true },
        { text: 'Rocket engine technology', isCorrect: false },
        { text: 'Solar technology', isCorrect: false },
      ],
    },
  ],
  Venus: [
    {
      question: 'Which technology is used to study the surface of Venus?',
      answers: [
        { text: 'Penetrating radar', isCorrect: true },
        { text: 'Optical telescope', isCorrect: false },
        { text: 'Communication satellites', isCorrect: false },
      ],
    },
    {
      question: 'Why do landers face difficulties landing on Venus?',
      answers: [
        { text: 'Due to extreme temperatures and pressure', isCorrect: true },
        { text: 'Due to the lack of an atmosphere', isCorrect: false },
        { text: 'Due to strong storms', isCorrect: false },
      ],
    },
    {
      question: 'What technologies aid in studying the atmosphere of Venus?',
      answers: [
        { text: 'Atmospheric balloons', isCorrect: true },
        { text: 'Rovers', isCorrect: false },
        { text: 'Oceanic probes', isCorrect: false },
      ],
    },
  ],
  Earth: [
    {
      question: 'Which technology aids in weather forecasting on Earth?',
      answers: [
        { text: 'Weather satellites', isCorrect: true },
        { text: 'Space telescopes', isCorrect: false },
        { text: 'Marine radars', isCorrect: false },
      ],
    },
    {
      question: 'Which technology is key to climate research on Earth?',
      answers: [
        { text: 'Observational satellites', isCorrect: true },
        { text: 'Rovers', isCorrect: false },
        { text: '3D printing', isCorrect: false },
      ],
    },
    {
      question: 'What tool is used to explore the deep ocean on Earth?',
      answers: [
        { text: 'Bathyscaphe', isCorrect: true },
        { text: 'Satellite', isCorrect: false },
        { text: 'Radar', isCorrect: false },
      ],
    },
  ],
};

export const bookQuestions: { [planet: string]: Question[] } = {
  Mercury: [
    {
      question: 'Which book describes a journey to Mercury?',
      answers: [
        { text: 'Journey to the Moon', isCorrect: false },
        { text: 'Journey to Mercury', isCorrect: true },
        { text: 'Cosmic Wanderings', isCorrect: false },
      ],
    },
  ],
};
