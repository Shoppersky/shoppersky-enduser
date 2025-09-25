import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import useStore from "@/lib/Zustand";

export default function DeleteAccount({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { logout } = useStore();


  const handleDelete = async () => {
    if (!password.trim()) {
      toast.error("Please enter your password to confirm.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.delete(`/users/hard-delete/${userId}`, {
        data: { current_password: password },
      });
      toast.success("Account deleted successfully.");
      logout();
    router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to delete account.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Account
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[475px] border-border/50 bg-card/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogDescription>
              This action is irreversible. Enter your password to permanently
              delete your account.
            </DialogDescription>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4"
            />
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-border/50 bg-transparent"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
