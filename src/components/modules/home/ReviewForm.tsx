import { addReview } from "@/actions/review.action";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ratings = [5, 4, 3, 2, 1];
export default function ReviewForm({ mealId }: { mealId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addReview(mealId, rating, comment);
      toast.success("Review Success");
      setComment("");
      setRating(5);
    } catch (error: any) {
      toast.error(error.message || "You can not review this meal");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8">
      <form onSubmit={submitReview} className="space-y-3">
        <label>Write review</label>
        <Textarea
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full mx-auto p-2 border-rounded"
        />
        <label>Ratings</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border-rounded dark:bg-zinc-900"
        >
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r} <Star />
            </option>
          ))}
        </select>
        <button
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full hover:cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
