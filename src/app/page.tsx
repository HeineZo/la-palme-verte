import type { Post } from "@/components/JotaiTest";
import JotaiTest from "@/components/JotaiTest";

export default function Home() {
    const initialPosts: Post[] = [
        {
            title: "Post 1",
            watched: false,
        },
        {
            title: "Post 2",
            watched: false,
        },
        {
            title: "Post 3",
            watched: false,
        },
    ];

    return (
        <main className="h-screen">
            <JotaiTest postsSent={initialPosts} />
        </main>
    );
}
