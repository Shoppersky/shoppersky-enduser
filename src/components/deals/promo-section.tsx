import { Button } from "@/components/ui/button"
import { Zap, Gift } from "lucide-react"

export function PromoSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Main Promo */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Flash Sale</span>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-balance">Up to 70% Off Electronics</h2>
          <p className="text-primary-foreground/80 mb-6">Limited time offer on top brands</p>
          <Button variant="secondary" size="lg">
            Shop Now
          </Button>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <Zap className="h-32 w-32" />
        </div>
      </div>

      {/* Secondary Promo */}
      <div className="bg-secondary text-secondary-foreground rounded-lg p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wide">Special Offer</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-balance">Free Shipping on Orders $50+</h2>
          <p className="text-secondary-foreground/80 mb-6">No code needed, discount applied at checkout</p>
          <Button variant="outline" className="bg-background text-foreground hover:bg-muted">
            Learn More
          </Button>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <Gift className="h-32 w-32" />
        </div>
      </div>
    </div>
  )
}
