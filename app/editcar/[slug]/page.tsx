"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export async function getCarData(id: string) {
  const response = await fetch(`http://0.0.0.0:3000/cars/${id}`, {
    method: "GET",
  });
  const carData = await response.json();
  console.log(carData);
  return carData;
}

export default async function EditCar({
  params,
}: {
  params: { slug: string };
}) {
  const carData = await getCarData(params.slug);
  const router = useRouter();
  const formSchema = z.object({
    make: z.string().min(3).max(20),
    model: z.string().min(3).max(20),
    year: z.string().min(2).max(4),
  });

  function CarForm({ carData }) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        make: `${carData.make}`,
        model: `${carData.model}`,
        year: `${carData.year}`,
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      // do something with the form vals
      try {
        const response = await fetch("http://0.0.0.0:3000/cars/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          router.push(`/viewcar/${data.id}`);
        }
      } catch (error) {
        router.push("/");
      }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input placeholder="Porsche" {...field} />
                </FormControl>
                <FormDescription>Enter car's make.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="911" {...field} />
                </FormControl>
                <FormDescription>Enter car's model.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="1980" {...field} />
                </FormControl>
                <FormDescription>Enter car's manufacture year.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  }

  return (
    <div>
      Car stuff {carData.model}
      <div>{carData.make}</div>
    </div>
  );
}
