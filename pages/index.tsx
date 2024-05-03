import { gql, useMutation } from "@apollo/client";
import type { Champions as Node } from "@prisma/client";
import Head from "next/head";
import React, { useCallback, useReducer } from 'react';
import Teams from "../components/teams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Bans from "../components/bans";
import { Actions, actionsKind, initialState, Sides, Team, teamSides, player } from "../types/type";
import Layout from "../components/Layout";

function Home() {
  
  return (
    <Layout title="Titulo">
      <div>

      </div>
    </Layout>
  );
}

export default Home;