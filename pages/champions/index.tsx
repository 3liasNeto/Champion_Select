import { gql, useMutation } from "@apollo/client";
import type { Champions as Node } from "@prisma/client";
import React, { useCallback, useReducer } from "react";
import Teams from "../../components/teams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Actions,
  actionsKind,
  initialState,
  Sides,
  Team,
  teamSides,
  player,
} from "../../types/type";
import Layout from "../../components/Layout";
import ChampionArea from "../../components/champion-area";
import Bans from "../../components/bans";

interface ChampionList {
  selected: string[];
  bans: string[];
}

const reducer = (state: Sides, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case actionsKind.IncreaseTeam:
      if (payload === undefined) return state;
      const side = payload.side as keyof Sides;
      if (payload.lane !== undefined) {
        console.log(payload.lane);
        return {
          ...state,
          [side]: { ...state[side], [payload.lane]: payload },
        };
      }
      const teamSize = Object.keys(state[side]);
      const filteredTeamSize = teamSize.filter(
        (position) => state[side][position as keyof Team] !== undefined
      );
      const updatedTeamSize = teamSize.filter(
        (position) => !filteredTeamSize.includes(position)
      );
      const teamSizeFiltered =
        updatedTeamSize.length > 0 ? updatedTeamSize : filteredTeamSize;
      const nextPosition = updatedTeamSize.length > 0 ? 0 : 4;
      const positionName = teamSizeFiltered[nextPosition];
      // console.log(teamSize)
      // console.log(side)
      // console.log(filteredTeamSize)
      // console.log(updatedTeamSize)
      // console.log(teamSizeFiltered)
      // console.log(nextPosition)
      // console.log(positionName)
      // console.log(state[side])
      // console.log(payload)

      return {
        ...state,
        [side]: { ...state[side], [positionName]: payload },
      };
    case actionsKind.Clear:
      return {
        BlueSide: { ...initialState.BlueSide },
        RedSide: { ...initialState.RedSide },
        BlueBans: { ...initialState.BlueBans },
        RedBans: { ...initialState.RedBans },
      };
    default:
      return state;
  }
};

export const findChampionMutation = gql`
  mutation findChampions(
    $name: String! = ""
    $lane: String! = ""
    $order: String! = "asc"
  ) {
    findChampion(name: $name, lane: $lane, order: $order) {
      id
      image
      name
      runes {
        position
      }
    }
  }
`;

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [findChampion, { data, loading, error }] =
    useMutation(findChampionMutation);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  React.useEffect(() => {
    const fetchChampions = async () => {
      const req = await findChampion({ variables: { name: "" } });
      return req.data;
    };
    router.push(pathname + "?" + createQueryString("side", teamSides[0]));
    fetchChampions();
  }, [findChampion]);

  const onSearch = async (value: string) => {
    try {
      const result = await findChampion({ variables: { name: value } });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const findLane = async (value: string) => {
    try {
      const result = await findChampion({ variables: { lane: value } });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedChampions = (state: Sides): ChampionList => {
    const selected: string[] = [];
    const bans: string[] = [];

    Object.values(state).forEach((team) => {
      Object.values(team).forEach((value: unknown) => {
        const playerItem = value as player | undefined;
        if (playerItem !== undefined && playerItem.name !== undefined) {
          if (playerItem.side === "BlueBans" || playerItem.side === "RedBans") {
            bans.push(playerItem.name);
          } else {
            selected.push(playerItem.name);
          }
        }
      });
    });

    return { selected, bans };
  };

  // console.log(state.BlueBans)

  const filterAvailableChampions = (
    champions: Node[],
    selectedChampions: string[]
  ): Node[] => {
    return champions.filter(
      (champion) =>
        !selectedChampions.includes(champion.name) &&
        !bansChampions.includes(champion.name)
    );
  };

  const selectedChampionsObject = getSelectedChampions(state);
  const selectedChampions = selectedChampionsObject.selected;
  const bansChampions = selectedChampionsObject.bans;
  // const availableChampions = filterAvailableChampions(data?.findChampion || [], selectedChampions);
  console.log(selectedChampionsObject.bans);

  const isChampionAvailable = (name: string): boolean => {
    return selectedChampions.includes(name);
  };

  const isChampionBanned = (name: string): boolean => {
    return bansChampions.includes(name);
  };

  const chooseChampions = (champion: Node) => {
    const selectedLane = searchParams.get("lane");
    const selectedSide = searchParams.get("side");
    const isSelected = isChampionAvailable(champion.name);
    const isBanned = isChampionBanned(champion.name);

    if (!isSelected && !isBanned) {
      if (selectedLane) {
        const params = new URLSearchParams(searchParams);
        const lane = params.get("lane");
        if (lane) {
          params.delete("lane");
          router.replace(`?${params.toString()}`);
        }
        return dispatch({
          type: actionsKind.IncreaseTeam,
          payload: { ...champion, lane: selectedLane, side: selectedSide! },
        });
      }

      return dispatch({
        type: actionsKind.IncreaseTeam,
        payload: { ...champion, side: selectedSide! },
      });
    }
  };

  return (
    <Layout title="Champion Select">
      <div className="flex flex-row h-screen items-center justify-between mx-4">
        <Teams data={state.BlueSide} side={teamSides.BlueSide} />
        <Bans champions={state.BlueBans} sideBan={"BlueBans"} />

        <ChampionArea
          chooseChampion={chooseChampions}
          data={data?.findChampion}
          findLane={findLane}
          isChampionBanned={isChampionBanned}
          isChampionSelected={isChampionAvailable}
          isLoading={loading}
          onSearch={onSearch}
        />
        
        <Bans champions={state.RedBans} sideBan={"RedBans"} />
        <Teams data={state.RedSide} side={teamSides.RedSide} />
      </div>
    </Layout>
  );
}

export default Home;
