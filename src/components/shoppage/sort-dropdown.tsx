// 'use client';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';

// interface SortDropdownProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export function SortDropdown({ value, onChange }: SortDropdownProps) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-sm">Sort by:</span>
//       <Select value={value} onValueChange={onChange}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Sort by" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="featured">Featured</SelectItem>
//           <SelectItem value="price-asc">Price: Low to High</SelectItem>
//           <SelectItem value="price-desc">Price: High to Low</SelectItem>
//           <SelectItem value="name-asc">Name: A to Z</SelectItem>
//           <SelectItem value="newest">Newest First</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
      

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="name">Name: A to Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
