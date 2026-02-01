import React from "react";
import ProviderMealTable from "../../../../../components/modules/dashboard/providerDashboard/ProviderMealTable";
import { getMyMeals } from "@/actions/provider.meal.action";

export default async function TotalMeal() {
  const { data } = await getMyMeals();

  return (
    <div>
      <h2>Meal that i add</h2>
      <ProviderMealTable meals={data} />
    </div>
  );
}
