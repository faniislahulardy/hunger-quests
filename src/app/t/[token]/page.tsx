import { jwtDecode } from 'jwt-decode';

import Game from '@/components/Game';
import { Provider } from '@/contexts/GameContext';
import { prisma } from '@/lib/prisma';

type Props = {
  params: {
    token: string;
  };
};

type TokenizeData = {
  teamId: string;
  gameId: string;
};

async function Page({ params }: Props) {
  const data = jwtDecode<TokenizeData>(params.token);

  const currentTeam = await prisma.team.findUnique({
    where: {
      id: data.teamId
    },
    include: {
      game: true
    }
  });

  const questQueue = await prisma?.quest_queue.findFirst({
    where: {
      team_id: currentTeam?.id,
      level: currentTeam?.level
    },
    include: {
      quest: true
    }
  });

  if (!currentTeam) {
    return <></>;
  }

  return (
    <main>
      <Provider game={currentTeam.game} team={currentTeam} queue={questQueue}>
        <Game />
      </Provider>
    </main>
  );
}

export default Page;
