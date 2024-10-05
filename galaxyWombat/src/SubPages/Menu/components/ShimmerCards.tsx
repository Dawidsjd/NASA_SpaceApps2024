import { ArrowRight, Cuboid, Globe, Telescope } from "lucide-react";

export default function ShimmerCards() {
  const cards = [
    {
      title: "3D Game",
      description: "Zanurz się w interaktywnym świecie gier 3D, gdzie możesz eksplorować różnorodne poziomy i wyzwania.",
      icon: <Cuboid className="h-6 w-6 text-blue-400" />, // Ikona dla 3D Game
    },
    {
      title: "Solar System",
      description: "Odkryj tajemnice Układu Słonecznego i poznaj planety, które go tworzą.",
      icon: <Globe className="h-6 w-6 text-blue-400" />, // Ikona dla Solar System
    },
    {
      title: "Stellarium",
      description: "Stellarium to symulator nieba, który pozwala na obserwację gwiazd, planet i innych ciał niebieskich.",
      icon: <Telescope className="h-6 w-6 text-blue-400" />, // Ikona dla Stellarium
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-1/2">
      {cards.map((card, index) => (
        <div key={index} className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-gray-900 p-6 group h-full">
          <div>
            <div className="flex items-center mb-2">
              {card.icon} {/* Dodanie ikony */}
              <h3 className="text-xl font-semibold text-white ml-2">{card.title}</h3>
            </div>
            <p className="text-gray-400 mb-4">{card.description}</p>
          </div>
          <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto">
            Dowiedz się więcej <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
        </div>
      ))}
    </div>
  );
}
