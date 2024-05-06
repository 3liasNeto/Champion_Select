import { gql, useMutation } from "@apollo/client";
import type { Champions as ChampionsData } from "@prisma/client";
import Head from "next/head";
import React, { useCallback, useReducer } from 'react';
import Teams from "./teams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Bans from "./bans";
import { Actions, actionsKind, initialState, Sides, Team, teamSides, player } from "../types/type";
import Layout from "./Layout";
import ChampionSelectArea from "./champion-selectArea";
import ChampionSearch from "./champion-search";
import ChampionLane from "./champion-lane";

interface ChampionAreaProps { 
    onSearch : (value : string) => void;
    findLane : (value : string) => void;
    chooseChampion : (selectedChampion : ChampionsData) => void;
    isChampionBanned : (isBanned : string) => boolean;
    isChampionSelected : (isSelected : string) => boolean;
    data : [ChampionsData];
    isLoading : boolean;
}

const ChampionArea: React.FC<ChampionAreaProps> = ({ data,
    chooseChampion,
    findLane,
    isChampionBanned,
    isChampionSelected,
    isLoading,
    onSearch
}) => {
   
  return (
    <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center px-3">
            <ChampionSearch onSearch={onSearch}/>
            <ChampionLane findChampion={findLane}/>
        </div>
        <ChampionSelectArea 
        data={data} 
        chooseChampion={chooseChampion} 
        isLoading={isLoading} 
        isChampionsSelected={isChampionSelected} 
        isChampionsBanned={isChampionBanned}
        />
    </div>
  )
}

export default ChampionArea