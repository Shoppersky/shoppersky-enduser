// 'use client';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '../ui/sheet';
// import { Button } from '../ui/button';
// import { FilterIcon } from 'lucide-react';
// import { Checkbox } from '../ui/checkbox';
// import { Slider } from '../ui/slider';
// import { Separator } from '../ui/separator';

// interface MobileFiltersProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   categories: string[];
//   selectedCategories: string[];
//   priceRange: [number, number];
//   onCategoryChange: (category: string) => void;
//   onPriceChange: (range: [number, number]) => void;
//   onClearFilters: () => void;
// }

// export function MobileFilters({
//   isOpen,
//   setIsOpen,
//   categories,
//   selectedCategories,
//   priceRange,
//   onCategoryChange,
//   onPriceChange,
//   onClearFilters,
// }: MobileFiltersProps) {
//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="sm" className="lg:hidden">
//           <FilterIcon className="mr-2 h-4 w-4" />
//           Filters
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//         <SheetHeader className="mb-5">
//           <div className="flex items-center justify-between">
//             <SheetTitle>Filters</SheetTitle>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClearFilters}
//               className="h-8 text-xs"
//             >
//               Clear all
//             </Button>
//           </div>
//         </SheetHeader>

//         <div className="space-y-6">
//           {/* Categories */}
//           <div>
//             <h3 className="mb-4 text-sm font-medium">Categories</h3>
//             <div className="space-y-3">
//               {categories.map((category) => (
//                 <div key={category} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={`mobile-category-${category}`}
//                     checked={selectedCategories.includes(category)}
//                     onCheckedChange={() => onCategoryChange(category)}
//                   />
//                   <label
//                     htmlFor={`mobile-category-${category}`}
//                     className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     {category}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator />

//           {/* Price Range */}
//           <div>
//             <h3 className="mb-4 text-sm font-medium">Price Range</h3>
//             <div className="space-y-4">
//               <Slider
//                 defaultValue={[priceRange[0], priceRange[1]]}
//                 max={500}
//                 step={10}
//                 value={[priceRange[0], priceRange[1]]}
//                 onValueChange={(value) =>
//                   onPriceChange(value as [number, number])
//                 }
//                 className="py-4"
//               />
//               <div className="flex items-center justify-between">
//                 <p className="text-sm">${priceRange[0]}</p>
//                 <p className="text-sm">${priceRange[1]}</p>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           <div className="flex justify-end">
//             <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }


'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { FilterIcon } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';

interface MobileFiltersProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onInStockChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export function MobileFilters({
  isOpen,
  setIsOpen,
  categories,
  selectedCategories,
  priceRange,
  inStockOnly,
  onCategoryChange,
  onPriceChange,
  onInStockChange,
  onClearFilters,
}: MobileFiltersProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-5">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 text-xs">
              Clear all
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-medium">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <Label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id={`mobile-category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryChange(category)}
                  />
                  <span className="text-sm">{category}</span>
                </Label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="mb-4 text-sm font-medium">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceChange(value as [number, number])}
                max={500}
                step={10}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm">${priceRange[0]}</p>
                <p className="text-sm">${priceRange[1]}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* In Stock Filter */}
          <div>
            <Label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox checked={inStockOnly} onCheckedChange={onInStockChange} />
              <span className="text-sm">In Stock Only</span>
            </Label>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
