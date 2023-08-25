import type { Post } from "@/components/JotaiTest";
import { Button } from "@nextui-org/button";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

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
            <Button
                color="primary"
                as={Link}
                href={"/association"}
                endContent={<IconChevronRight />}
            >
                Découvrir plus
            </Button>
            <Button color="primary" endContent={<IconChevronRight />}>
                Découvrir l'association
            </Button>
        </main>
    );
}
