import { env } from "@/env";
import CreateMealForm from "../../../../../components/modules/dashboard/providerDashboard/CreateMealForm";
import { getCategory } from "@/actions/category.action";


export default async function AddMeal() {
  const categories = await getCategory();

const categoryList = categories?.data?.data || [];

  return (
    <div className="px-6 md:px-10">
      <h2 className="text-center text-2xl fon bold"> Create a new Meal</h2>
      <CreateMealForm categories={categoryList} />
    </div>
  );
}
