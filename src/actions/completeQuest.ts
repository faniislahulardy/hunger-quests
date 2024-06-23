'use server';

import { prisma } from '@/lib/prisma';
import { GAME_STAGE } from '@/types';

export async function completeQuest(teamId: string, questQueueId: string, currentLevel: number) {
  await prisma.quest_queue.update({
    where: {
      id: questQueueId
    },
    data: {
      is_done: true
    }
  });

  await prisma.team.update({
    where: {
      id: teamId
    },
    data: {
      level: currentLevel + 1,
      game: {
        update: {
          data: {
            stage: currentLevel + 1 > 2 ? GAME_STAGE.FINISHED : GAME_STAGE.PLAYING
          }
        }
      }
    }
  });
}
