'use client';

import { faCheckCircle, faCircleXmark, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Game, Player, Quest, Quest_queue, Team } from '@prisma/client';
import jwtEncode from 'jwt-encode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { completeQuest } from '@/actions/completeQuest';
import endGame from '@/actions/endGame';
import resetAll from '@/actions/resetAll';
import startGame from '@/actions/startGame';
import updatePosition from '@/actions/updatePosition';
import { GAME_STAGE } from '@/types';

import Button from '../Button';

type Props = {
  games?: Game[];
  teams?: ({ quest_queues: ({ quest: Quest } & Quest_queue)[] } & { players: Player[] } & Team)[];
};

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  'data-selected'?: boolean;
}

export default function Master({ games, teams }: Props) {
  const router = useRouter();

  const resetAllProgress = async () => {
    await resetAll();
    router.refresh();
  };

  const endGameById = (gameId: string) => async () => {
    await endGame(gameId);
    router.refresh();
  };

  const startGameById = (gameId: string) => async () => {
    await startGame(gameId);
    router.refresh();
  };

  const updateQuestLevel = (teamId: string, queueId: string, level: number) => async () => {
    await completeQuest(teamId, queueId, level);
    router.refresh();
  };

  const updateTeamPosition = (queueId: string) => async () => {
    await updatePosition(queueId);
    router.refresh();
  };

  return (
    <Container>
      <h1>Game Master</h1>

      <h3>Reset all progress</h3>
      <br />
      <Button onClick={resetAllProgress}>Reset Game</Button>

      <br />
      <br />
      <h3>Game</h3>
      {games?.map(game => (
        <Row key={`${game.id}-${game.stage}`}>
          {game.stage === GAME_STAGE.ONBOARDING && (
            <Button onClick={startGameById(game.id)}>Start Game</Button>
          )}

          {game.stage === GAME_STAGE.PLAYING && (
            <Button onClick={endGameById(game.id)}>End Game</Button>
          )}
        </Row>
      ))}

      <br />
      <br />
      <h3>Team progress</h3>
      {teams?.map(team => (
        <Container key={`${team.id}-${team.level}`}>
          <h4>
            {team.name} - Level {team.level}
          </h4>
          <br />
          <Link
            href={`/t/${jwtEncode({ teamId: team.id, gameId: team.game_id }, '')}`}
            target='_blank'
          >
            <FontAwesomeIcon style={{ marginRight: 10 }} icon={faPaperPlane} />
            Quest link
          </Link>
          <Container>
            <ul>{team.players?.map(player => <li key={player.id}>{player.name}</li>)}</ul>
          </Container>
          <h5>Quest queues</h5>
          {team.quest_queues?.map(questQueue => (
            <Container data-selected={questQueue.level === team.level} key={questQueue.id}>
              <strong>Level {questQueue.level}</strong>
              <p>
                Reached:{' '}
                {questQueue.is_reached ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  <FontAwesomeIcon icon={faCircleXmark} />
                )}
              </p>
              <p>
                Done:{' '}
                {questQueue.is_done ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  <FontAwesomeIcon icon={faCircleXmark} />
                )}
              </p>
              <p>Quest clue: {questQueue.quest.clue}</p>
              <Row>
                {!questQueue.is_reached && (
                  <Button onClick={updateTeamPosition(questQueue.id)}>Set Reached</Button>
                )}
                {!questQueue.is_done && (
                  <Button onClick={updateQuestLevel(team.id, questQueue.id, team.level)}>
                    Set Done
                  </Button>
                )}
              </Row>
            </Container>
          ))}
        </Container>
      ))}
    </Container>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;

const Container = styled.div<ContainerProps>`
  margin: 10px;
  padding: 10px 10px 20px 10px;
  border-radius: 10px;
  border-width: ${props => (props['data-selected'] ? '1px' : '0px')};
  border-color: #0090e3;
  border-style: solid;
`;
