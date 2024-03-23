"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const formSchema = z.object({
  make: z.string().min(3).max(20),
  model: z.string().min(3).max(20),
  year: z.string().min(2).max(4),
});

export function CarForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // do something with the form vals
    console.log(values);
    console.log(JSON.stringify(values));
    fetch("0.0.0.0:3000/cars/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
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

export default function AddCar() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <CarForm />
      </div>
    </main>
  );
}
