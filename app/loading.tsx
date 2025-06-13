'use client';

import Loader from '@/components/ui/loader';

const Loading = () => {
  return (
    <div className="flex h-[100dvh] w-[100dvw]">
      <Loader className="m-auto" size="lg" text="Caricamento in corso..." />
    </div>
  );
};

export default Loading;
