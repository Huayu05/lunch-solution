"use client";

interface Props {
  coords: { lat: number; lng: number } | null;
}

export const EmbedMap: React.FC<Props> = ({ coords }) => {
  if (!coords) return <p>Loading map...</p>;

  return (
    <iframe
      className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] border-0 rounded-lg"
      src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=15&output=embed`}
      allowFullScreen
      loading="lazy"
    >
    </iframe>
  );
};
