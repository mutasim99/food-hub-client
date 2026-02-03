import { getFeaturedRestaurant } from "@/actions/customer.action";
import FeaturedRestaurantCard from "@/components/sheared/FeaturedRestaurantCard";
import { env } from "@/env";
import React from "react";

export default async function FeaturedRestaurant() {
  const {data} = await getFeaturedRestaurant();
  

  return (
    <div>
      <FeaturedRestaurantCard providers={data.data ||[]} />
    </div>
  );
}
