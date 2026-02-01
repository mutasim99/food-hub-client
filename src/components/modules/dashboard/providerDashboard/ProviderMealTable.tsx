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
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.category.name}</TableCell>
              <TableCell>{meal.price}</TableCell>
              <TableCell className="text-center space-x-2">
                <Button size="sm" variant="outline" className="hover:cursor-pointer">
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
