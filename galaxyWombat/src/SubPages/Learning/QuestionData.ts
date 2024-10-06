interface Question {
    question: string;
    answers: { text: string; isCorrect: boolean }[];
  }
  
  export const techQuestions: { [planet: string]: Question[] } = {
    Mercury: [
      {
        question: 'Jakie jest najważniejsze zadanie sondy kosmicznej Messenger na Merkurym?',
        answers: [
          { text: 'Badanie powierzchni Merkurego', isCorrect: true },
          { text: 'Poszukiwanie wody na Merkurym', isCorrect: false },
          { text: 'Badanie atmosfery Merkurego', isCorrect: false },
        ],
      },
      {
        question: 'Dlaczego Merkury jest trudny do badania z Ziemi?',
        answers: [
          { text: 'Jest zbyt blisko Słońca', isCorrect: true },
          { text: 'Ma silną atmosferę', isCorrect: false },
          { text: 'Jest zbyt daleko', isCorrect: false },
        ],
      },
      {
        question: 'Która z tych technologii jest kluczowa dla badania Merkurego?',
        answers: [
          { text: 'Technologia termoizolacji', isCorrect: true },
          { text: 'Technologia silników rakietowych', isCorrect: false },
          { text: 'Technologia solarna', isCorrect: false },
        ],
      },
    ],
    Venus: [
      {
        question: 'Która technologia jest używana do badania powierzchni Wenus?',
        answers: [
          { text: 'Radar penetracyjny', isCorrect: true },
          { text: 'Teleskop optyczny', isCorrect: false },
          { text: 'Satelity komunikacyjne', isCorrect: false },
        ],
      },
      {
        question: 'Dlaczego lądowniki mają trudności z lądowaniem na Wenus?',
        answers: [
          { text: 'Z powodu ekstremalnych temperatur i ciśnienia', isCorrect: true },
          { text: 'Z powodu braku atmosfery', isCorrect: false },
          { text: 'Z powodu silnych burz', isCorrect: false },
        ],
      },
      {
        question: 'Jakie technologie pomagają w badaniach atmosfery Wenus?',
        answers: [
          { text: 'Balony atmosferyczne', isCorrect: true },
          { text: 'Łaziki', isCorrect: false },
          { text: 'Sondy oceaniczne', isCorrect: false },
        ],
      },
    ],
    Earth: [
      {
        question: 'Która technologia pomaga w prognozowaniu pogody na Ziemi?',
        answers: [
          { text: 'Satelity meteorologiczne', isCorrect: true },
          { text: 'Teleskopy kosmiczne', isCorrect: false },
          { text: 'Radary morskie', isCorrect: false },
        ],
      },
      {
        question: 'Która technologia jest kluczowa dla badań klimatu na Ziemi?',
        answers: [
          { text: 'Satelity obserwacyjne', isCorrect: true },
          { text: 'Łaziki', isCorrect: false },
          { text: 'Druk 3D', isCorrect: false },
        ],
      },
      {
        question: 'Jakie narzędzie jest używane do badania głębokiego oceanu na Ziemi?',
        answers: [
          { text: 'Batyskaf', isCorrect: true },
          { text: 'Satelita', isCorrect: false },
          { text: 'Radar', isCorrect: false },
        ],
      },
    ],
  };
  
  export const bookQuestions: { [planet: string]: Question[] } = {
    Mercury: [
      {
        question: 'Jaka książka opisuje podróż na Merkurego?',
        answers: [
          { text: 'Podróż na Księżyc', isCorrect: false },
          { text: 'Podróż na Merkurego', isCorrect: true },
          { text: 'Kosmiczne Wędrówki', isCorrect: false },
        ],
      },
    ],
  };
  
  