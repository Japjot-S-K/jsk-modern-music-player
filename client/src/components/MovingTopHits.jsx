import MovingRow from "./MovingRow";

const makeCovers = (start) =>
  Array.from({ length: 5 }).map((_, i) => ({
    cover: `/covers/cover${start + i}.jpg`,
  }));

export default function MovingTopHits() {
  return (
    <div className="space-y-6">
      <Section title="Top Hits" items={makeCovers(1)} />
      <Section title="Top Indie" items={makeCovers(6)} />
      <Section title="Top Pop" items={makeCovers(11)} />
      <Section title="Top EDM" items={makeCovers(16)} />
      <Section title="Top Chill" items={makeCovers(21)} />
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <MovingRow items={items} />
    </div>
  );
}
