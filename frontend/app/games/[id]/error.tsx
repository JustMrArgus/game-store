'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const GameNotFound = () => {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <Alert
        variant="destructive"
        className="max-w-md bg-[#353538] border-none p-10"
      >
        <AlertTitle className="text-2xl font-bold">Game not found</AlertTitle>
        <AlertDescription className="font-bold">
          This game does not exist!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default GameNotFound;
