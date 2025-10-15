import DetailsButtonServer from "@/components/details-button-server";
import PostsList from "@/components/posts-list";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Next.js + Supabase + Prisma 示例</h1>
      
      <div className="mb-8">
        <DetailsButtonServer />
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">文章列表 (Prisma + Supabase)</h2>
        <PostsList />
      </div>
    </div>
  );
}
