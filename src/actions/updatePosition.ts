'use server';

import { prisma } from '@/lib/prisma';

export default async function updatePosition(questQueueId: string) {
  await prisma?.quest_queue.update({
    where: {
      id: questQueueId
    },
    data: {
      is_reached: true
    }
  });
}
