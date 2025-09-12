import { DealsHeader } from "@/components/deals/deals-header"
import { CountdownTimer } from "@/components/deals/countdown-timer"
import { ProductGrid } from "@/components/deals/product-grid"
import { PromoSection } from "@/components/deals/promo-section"
import { DealsFilters } from "@/components/deals/deals-filters"

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <DealsHeader /> */}

      <main className="container mx-auto px-4 py-8">
        {/* Flash Sale Section */}
        <PromoSection />

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Filters */}
        <DealsFilters />

        {/* Product Grid */}
        <ProductGrid />
      </main>
    </div>
  )
}
