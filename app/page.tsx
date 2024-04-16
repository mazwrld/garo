import { db } from "@/server/db";

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

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages].map((image, index) => (
          <div key={index.toString() + image.id.toString()} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
