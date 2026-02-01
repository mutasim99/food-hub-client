import { getPopularMeals } from '@/actions/meal.action'
import PopularMealCard from '@/components/ui/PopularMealCard';
import React from 'react'

export default async function PopularMeals() {
    const {data} = await getPopularMeals();
    const popularMeals = data.data
    
  return (
    <div>
      <PopularMealCard meals={popularMeals}/>
    </div>
  )
}
