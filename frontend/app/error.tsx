'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Error = () => {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <Alert
        variant="destructive"
        className="max-w-md bg-[#353538] border-none p-10"
      >
        <AlertTitle className="text-2xl font-bold">
          The error occured!
        </AlertTitle>
        <AlertDescription className="font-bold">
          Terrible error happend. Try again later
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Error;
