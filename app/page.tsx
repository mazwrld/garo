const mockUrls = [
  "https://utfs.io/f/75d5b4c5-5f2a-464b-aded-a3a62fec8e25-21ovs.jpeg",
  "https://utfs.io/f/75d5b4c5-5f2a-464b-aded-a3a62fec8e25-21ovs.jpeg",
  "https://utfs.io/f/75d5b4c5-5f2a-464b-aded-a3a62fec8e25-21ovs.jpeg",
  "https://utfs.io/f/75d5b4c5-5f2a-464b-aded-a3a62fec8e25-21ovs.jpeg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages].map((image) => (
          <div key={image.id + 1} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
