import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import Image from "next/image";
import { IconList } from "@tabler/icons-react";

export default async function ProfileBoards() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      favoriteBoards: {
        include: {
          columns: {
            include: {
              tasks: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const boards = user.favoriteBoards.map((board) => ({
    ...board,
    tasksCount: board.columns.reduce(
      (sum: number, column) => sum + column.tasks.length,
      0,
    ),
    isFavorited: true,
  }));

  if (boards.length === 0) {
    return <p>No favorite boards found.</p>;
  }

  return (
    <>
      {boards.map((board) => (
        <Link key={board.id} href={`/board/${board.id}`}>
          <div className="h-32 flex flex-col justify-end rounded-xl shadow-md bg-zinc-800 hover:bg-zinc-950 relative overflow-hidden">
            {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/40 backdrop-blur-md z-10"></div> */}
            {board.backgroundUrl && (
              <Image
                className="object-cover object-center z-0"
                src={board.backgroundUrl}
                alt="Board Wallpaper"
                fill
              />
            )}

            <span
              className="
                            absolute top-2 right-2 
                            flex items-center justify-center gap-1
                            text-xs text-primary bg-white
                            p-1 rounded-md z-20
                        "
            >
              <IconList size={16} />
              <span>{board.tasksCount}</span>
            </span>

            <h4
              className="
                        font-semibold
                        z-20
                        drop-shadow-lg 
                        p-2 
                        overflow-ellipsis overflow-x-hidden whitespace-nowrap block
                        "
            >
              {board.title}
            </h4>
          </div>
        </Link>
      ))}
    </>
  );
}
