import type { Champions as Node } from "@prisma/client";

export enum teamSides {
  "BlueSide",
  "RedSide",
}

export interface player extends Node {
  lane?: string;
  side: string;
}

export interface Team {
  TOP: player | undefined;
  JG: player | undefined;
  MID: player | undefined;
  ADC: player | undefined;
  SUP: player | undefined;
}

export enum sideKeys {
  "TOP",
  "JG",
  "MID",
  "SUP",
  "ADC",
}

export interface BlueSide extends Team {}
export interface RedSide extends Team {}

export enum actionsKind {
  IncreaseTeam = "ADD_TO_BLUE_SIDE",
  Clear = "CLEAR_SELECTION",
}

export interface Actions {
  type: actionsKind;
  payload: player | undefined;
}

export interface Sides {
  BlueSide: BlueSide;
  RedSide: RedSide;
  BlueBans: BlueSide;
  RedBans: RedSide;
}

export const initialState: Sides = {
  BlueSide: {
    TOP: undefined,
    JG: undefined,
    MID: undefined,
    ADC: undefined,
    SUP: undefined,
  },
  RedSide: {
    TOP: undefined,
    JG: undefined,
    MID: undefined,
    ADC: undefined,
    SUP: undefined,
  },
  RedBans: {
    TOP: undefined,
    JG: undefined,
    MID: undefined,
    ADC: undefined,
    SUP: undefined,
  },
  BlueBans: {
    TOP: undefined,
    JG: undefined,
    MID: undefined,
    ADC: undefined,
    SUP: undefined,
  },
};
