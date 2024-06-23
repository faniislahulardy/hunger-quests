'use server';

import { prisma } from '@/lib/prisma';

export default async function createPlayer(name: string, teamId: string) {
  return await prisma?.player.create({
    data: {
      name,
      team_id: teamId
    }
  });
}
