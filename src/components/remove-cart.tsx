"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/components/cart-provider";

export function RemoveFromCartButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { removeFromCart } = useCart();

  return (
    <AlertDialog>
      {/* The button to open dialog */}
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Remove
        </Button>
      </AlertDialogTrigger>

      {/* The dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{productName}</strong> from
            your cart? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={() => removeFromCart(productId)}
          >
            Yes, Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
