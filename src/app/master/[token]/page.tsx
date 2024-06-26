import Master from '@/components/Master';
import { prisma } from '@/lib/prisma';

type Props = {
  params: {
    token: string;
  };
};

const STATIC_TOKEN = 'pineapple';

export default async function Page({ params }: Props) {
  if (params.token !== STATIC_TOKEN) {
    return null;
  }

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

export const dynamic = 'force-dynamic';
