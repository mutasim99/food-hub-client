import { env } from "@/env";
import CreateMealForm from "./CreateMealForm";

const apiUrl = env.BACKEND_URL;
export default async function AddMeal() {
  const res = await fetch(`${apiUrl}/categories`);
  const categories = await res.json();

  return (
    <div className="px-6 md:px-10">
      <h2 className="text-center text-2xl fon bold"> Create a new Meal</h2>
      <CreateMealForm categories={categories.data} />
    </div>
  );
}
