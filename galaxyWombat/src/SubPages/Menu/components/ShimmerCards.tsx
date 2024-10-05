import { ArrowRight } from "lucide-react"

export default function ShimmerCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-1/2">
      {[1, 2, 3].map((card) => (
        <div key={card} className="relative overflow-hidden rounded-xl bg-gray-900 p-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2">Karta {card}</h3>
            <p className="text-gray-400 mb-4">To jest przykładowa treść dla karty {card}. Każda karta ma unikalny numer i efekt shimmer.</p>
            <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              Dowiedz się więcej <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}