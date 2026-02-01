"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import DeleteMealModel from "./DeleteMealModal";

interface Meal {
  id: string;
  name: string;
  price: number;
  category: { name: string };
}

export default function ProviderMealTable({ meals }: { meals: Meal[] }) {
  const [selectId, setSelectId] = useState<string | null>(null);
  return (
    <div>
      <Table className="border-2 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-500"
              >
                No meal found
              </TableCell>
            </TableRow>
          ) : (
            meals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.category.name}</TableCell>
                <TableCell>{meal.price}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:cursor-pointer"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="hover:cursor-pointer"
                    onClick={() => setSelectId(meal.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DeleteMealModel mealId={selectId} onClose={() => setSelectId(null)} />
    </div>
  );
}
