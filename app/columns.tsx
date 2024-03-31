"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Car = {
  id: number;
  make: number;
  model: string;
  year: number;
};

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const car = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/editcar/${car.id}`)}>
              Edit Car
            </DropdownMenuItem>
            <DropdownMenuItem>View Car</DropdownMenuItem>
            <DropdownMenuItem>View Car Components</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Car</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
