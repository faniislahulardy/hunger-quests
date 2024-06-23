'use client';

import resetAll from '@/actions/resetAll';

export default function Page() {
  return (
    <>
      <button onClick={async () => await resetAll()}>Reset Game</button>
    </>
  );
}
