import { deleteMyMeals } from "@/actions/provider.meal.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteMealModel({
  mealId,
  onClose,
}: {
  mealId: string | null;
  onClose: () => void;
}) {
  const router = useRouter();
  if (!mealId) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const res = await deleteMyMeals(mealId);
      if (res.error) {
        toast.error(res.error || "Failed to delete meal");
        return;
      }
      toast.success("Meal deleted");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };
  return (
    <div>
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Meal</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure? This action can not be undone
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
