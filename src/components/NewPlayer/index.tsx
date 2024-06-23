import { useState } from 'react';
import styled from 'styled-components';

import createPlayer from '@/actions/createPlayer';
import { useGameContext } from '@/contexts/GameContext';

import Button from '../Button';
import TextInput from '../TextInput';

export default function NewPlayer() {
  const { team } = useGameContext();
  const [name, setName] = useState<string>('');

  const onCreateUser = async () => {
    const player = await createPlayer(name, team.id);

    if (player && player.id) {
      window.localStorage.setItem('player', JSON.stringify(player));
      window.location.reload();
    }
  };

  return (
    <Container>
      <h1>Let me know your name</h1>
      <TextInput
        data-valid
        type='text'
        value={name}
        onChange={event => setName(event.currentTarget.value)}
        placeholder='Input name'
      />

      <ActionContainer>
        {name.length > 2 && <Button onClick={onCreateUser}>Let me in!</Button>}
      </ActionContainer>
    </Container>
  );
}

const ActionContainer = styled.div`
  height: 3em;
`;

const Container = styled.div`
  padding: 2rem;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
  }

  button {
    margin-top: 40px;
  }
`;
