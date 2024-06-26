import Master from '@/components/Master';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const games = await prisma?.game.findMany();

  const teams = await prisma?.team.findMany({
    include: {
      quest_queues: {
        include: {
          quest: true
        },
        orderBy: {
          level: 'asc'
        }
      },
      players: true
    },
    orderBy: {
      level: 'asc'
    }
  });

  return <Master games={games} teams={teams} />;
}
