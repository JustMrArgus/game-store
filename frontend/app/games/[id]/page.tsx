'use client';

import { useParams } from 'next/navigation';

const GamePage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return <div>{`Game Page Number ${id}`}</div>;
};

export default GamePage;
