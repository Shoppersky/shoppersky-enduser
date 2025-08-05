// 'use client';

// import { Slider } from '../ui/slider';
// import { Checkbox } from '../ui/checkbox';
// import { Button } from '../ui/button';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '../ui/accordion';

// interface FilterSidebarProps {
//   categories: string[];
//   selectedCategories: string[];
//   priceRange: [number, number];
//   onCategoryChange: (category: string) => void;
//   onPriceChange: (range: [number, number]) => void;
//   onClearFilters: () => void;
// }

// export function FilterSidebar({
//   categories,
//   selectedCategories,
//   priceRange,
//   onCategoryChange,
//   onPriceChange,
//   onClearFilters,
// }: FilterSidebarProps) {
//   return (
//     <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-lg font-medium">Filters</h2>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={onClearFilters}
//           className="h-8 text-xs"
//         >
//           Clear all
//         </Button>
//       </div>

//       <Accordion
//         type="multiple"
//         defaultValue={['categories', 'price']}
//         className="w-full"
//       >
//         <AccordionItem value="categories">
//           <AccordionTrigger className="text-sm font-medium">
//             Categories
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-2 pt-1">
//               {categories.map((category) => (
//                 <div key={category} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={`category-${category}`}
//                     checked={selectedCategories.includes(category)}
//                     onCheckedChange={() => onCategoryChange(category)}
//                   />
//                   <label
//                     htmlFor={`category-${category}`}
//                     className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     {category}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="price">
//           <AccordionTrigger className="text-sm font-medium">
//             Price Range
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-4 pt-2">
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
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }



'use client';

import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onInStockChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  priceRange,
  inStockOnly,
  onCategoryChange,
  onPriceChange,
  onInStockChange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-4 rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 text-xs">
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price']} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <Label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryChange(category)}
                  />
                  <span className="text-sm">{category}</span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceChange(value as [number, number])}
                max={99000}
                step={10}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm">${priceRange[0]}</p>
                <p className="text-sm">${priceRange[1]}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="in-stock">
          <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
          <AccordionContent>
            <Label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox checked={inStockOnly} onCheckedChange={onInStockChange} />
              <span className="text-sm">In Stock Only</span>
            </Label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
