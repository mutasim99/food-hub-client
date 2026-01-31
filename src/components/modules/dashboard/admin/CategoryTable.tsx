import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MealCategory {
  id: string;
  name: string;
}

interface MealCategoryProps {
  category: MealCategory[];
}

export default function CategoryTable({ category }: MealCategoryProps) {

  return (
    <div>
      <Table className="border-4 rounded-md ">
        <TableHeader>
          <TableRow>
            
            <TableHead>id</TableHead>
            <TableHead>name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
