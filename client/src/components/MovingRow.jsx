export default function MovingRow({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="overflow-hidden">
      <div className="flex gap-3 animate-scroll-x">
        {[...items, ...items].map((i, idx) => (
          <img
            key={idx}
            src={i.cover}
            className="w-20 h-20 rounded object-cover"
          />
        ))}
      </div>
    </div>
  );
}
