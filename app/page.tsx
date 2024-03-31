"use client";
import { Car, columns } from "./columns";
import { DataTable } from "./data-table";

export async function getCars(): Promise<Car[]> {
  const cars = await fetch("http://0.0.0.0:3000/cars", { method: "GET" }).then(
    (res) => res.json(),
  );

  return cars;
}

export default async function Home() {
  const cardata = await getCars();

  console.log(cardata);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-10">
        <h1>Cars list:</h1>
        <DataTable columns={columns} data={cardata} />
      </div>
    </main>
  );
}
