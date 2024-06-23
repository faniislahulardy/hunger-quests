import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { distance as textDistance } from 'fastest-levenshtein';
import { getPreciseDistance } from 'geolib';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { completeQuest } from '@/actions/completeQuest';
import updatePosition from '@/actions/updatePosition';
import { useGameContext } from '@/contexts/GameContext';

import Button from '../Button';
import TextInput from '../TextInput';

export default function Quest() {
  const { team, queue } = useGameContext();
  const [answer, setAnswer] = useState<string>('');
  const [difference, setDifference] = useState(99);
  const [distance, setDistance] = useState(-1);

  useEffect(() => {
    setDifference(textDistance(answer.toLowerCase(), (queue?.quest.answer || '').toLowerCase()));
  }, [answer]);

  useEffect(() => {
    const localLatitude = Number(localStorage.getItem('latitude') || 0);
    const localLongitude = Number(localStorage.getItem('longitude') || 0);
    setDistance(
      getPreciseDistance(
        { latitude: localLatitude, longitude: localLongitude },
        { latitude: Number(queue?.quest.latitude), longitude: Number(queue?.quest.longitude) }
      )
    );
    trackLocation();
  }, []);

  const trackLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDistance(
            getPreciseDistance(
              { latitude, longitude },
              { latitude: Number(queue?.quest.latitude), longitude: Number(queue?.quest.longitude) }
            )
          );
          localStorage.setItem('latitude', String(latitude));
          localStorage.setItem('longitude', String(longitude));
        },
        error => console.log('Loaction error', error),
        {
          enableHighAccuracy: false,
          maximumAge: 0
        }
      );
    }
  };

  if (!queue) {
    return <></>;
  }

  return (
    <QuestContainer>
      {!queue.is_reached && (
        <>
          <QuestName>{queue.quest.name}</QuestName>
          <QuestText>{queue.quest.clue}</QuestText>
          <QuestLocation>
            {distance < 0 && <span>Load location...</span>}
            {distance >= 0 && (
              <span>
                <FontAwesomeIcon icon={faCompass} /> Distance: {distance}m{' '}
              </span>
            )}
          </QuestLocation>
        </>
      )}

      {queue.is_reached && (
        <>
          <QuestText>{queue.quest.question}</QuestText>
          <TextInput
            type='text'
            value={answer}
            onChange={event => setAnswer(event.currentTarget.value)}
            placeholder='your aswer'
            data-valid={difference === 0}
          />
          <QuestHint>
            {difference < 2 && difference > 0 && <span>Almost correct!</span>}
            {difference === 0 && (
              <Button onClick={onQuestCompleted(team.id, queue.id, team.level)}>Next</Button>
            )}
          </QuestHint>
        </>
      )}

      {!queue.is_reached && <Button onClick={onArrived(queue.id)}>I&lsquo;m here</Button>}
    </QuestContainer>
  );
}

const onArrived = (queueId: string) => async () => {
  await updatePosition(queueId);
  window.location.reload();
};

const onQuestCompleted = (teamId: string, queueId: string, level: number) => async () => {
  await completeQuest(teamId, queueId, level);
  window.location.reload();
};

const QuestLocation = styled.div`
  height: 2rem;
  margin-top: 20px;
  span {
    font-size: 1rem;
  }
  svg {
    margin-right: 5px;
  }
`;

const QuestHint = styled.div`
  height: 2rem;
  margin-top: 20px;
`;

const QuestText = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
`;

const QuestName = styled.span`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const QuestContainer = styled.div`
  padding: 2rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
