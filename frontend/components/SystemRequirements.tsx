import SystemRequirementsItem from '@/components/SystemRequirementsItem';

interface Game {
  title: string;
  minOS: string;
  minCPU: string;
  minMemory: string;
  minGPU: string;
  minStorage: string;
  recOS: string;
  recCPU: string;
  recMemory: string;
  recGPU: string;
  recStorage: string;
  platforms: string[];
}

interface SystemRequirementsProps {
  game: Game;
}

const SystemRequirements = ({ game }: SystemRequirementsProps) => {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">
        {game.title} System Requirements
      </h2>

      <div className="bg-[#202024] p-10 flex flex-col gap-8 rounded-xl">
        <div className="flex gap-80">
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-bold">Minimum</h3>
            <SystemRequirementsItem title="OS" value={game.minOS} />
            <SystemRequirementsItem title="Processor" value={game.minCPU} />
            <SystemRequirementsItem title="Memory" value={game.minMemory} />
            <SystemRequirementsItem title="Graphics" value={game.minGPU} />
            <SystemRequirementsItem title="Storage" value={game.minStorage} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-white font-bold">Recommended</h3>
            <SystemRequirementsItem title="OS" value={game.recOS} />
            <SystemRequirementsItem title="Processor" value={game.recCPU} />
            <SystemRequirementsItem title="Memory" value={game.recMemory} />
            <SystemRequirementsItem title="Graphics" value={game.recGPU} />
            <SystemRequirementsItem title="Storage" value={game.recStorage} />
          </div>
        </div>

        <p>
          Platforms available:{' '}
          <span className="italic">{game.platforms.join(', ')}</span>
        </p>
      </div>
    </>
  );
};

export default SystemRequirements;
