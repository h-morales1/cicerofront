export async function getCarData(id: string) {
  const response = await fetch(`http://0.0.0.0:3000/cars/${id}`, {
    method: "GET",
  });
  const carData = await response.json();
  console.log(carData);
  return carData;
}

export default async function ViewCar({
  params,
}: {
  params: { slug: string };
}) {
  const carData = await getCarData(params.slug);
  return (
    <div>
      Car stuff {carData.model}
      <div>{carData.make}</div>
    </div>
  );
}
