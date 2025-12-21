import MovingRow from "./MovingRow";

export default function HomeView() {
  return (
    <div className="space-y-8">
      <MovingRow title="Top Classical" />
      <MovingRow title="Top Indie" />
      <MovingRow title="Top Pop" />
      <MovingRow title="Top EDM" />
      <MovingRow title="Top Chill" />
    </div>
  );
}
