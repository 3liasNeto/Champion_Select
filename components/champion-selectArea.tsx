import React from "react";
import type { Champions as champions } from "@prisma/client";
import Image from "next/image";

interface champiosSelectAreaProps {
  data: [champions];
  isLoading: boolean;
  chooseChampion: (champion: champions) => void;
  isChampionsBanned: (name: string) => boolean;
  isChampionsSelected: (name: string) => boolean;
}

const ChampionSelectArea: React.FC<champiosSelectAreaProps> = ({
  data,
  isLoading,
  chooseChampion,
  isChampionsBanned,
  isChampionsSelected
}) => {

  return (
    <div className="h-[600px] overflow-auto w-[700px] champion_scroll">
      {!isLoading ? (
        <div className="w-full h-full grid grid-cols-6 gap-2">
          {data?.map((champion: champions) => (
            <div key={champion.id} className={`flex flex-col items-center`}>
              <Image
                src={champion.image}
                alt={`${champion.name}-ICON`}
                height={84}
                width={84}
                onClick={() => chooseChampion(champion)}
                className={`${isChampionsSelected(champion.name) || isChampionsSelected(champion.name) ? 'grayscale-[60]' : ''}`}
              />
              <h1 className="text-white/80 font-medium">{champion.name}</h1>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ChampionSelectArea;
