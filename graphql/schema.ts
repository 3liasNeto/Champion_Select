import "./types/Champions"
import "./types/Runes"
import "./types/RunesRecommends"
import { builder } from "./builder";

export const schema = builder.toSchema()