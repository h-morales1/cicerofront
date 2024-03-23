export default function ViewCar({ params }: { params: { slug: string } }) {
  return <div>My car: {params.slug}</div>;
}
