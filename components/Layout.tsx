import { StringValueNode } from "graphql";
import Head from "next/head";
import React, { ReactNode, useCallback, useReducer } from 'react';
import { cn } from "../types/utils";

interface layoutProps {
    title : string;
    children : ReactNode;
    className ?: string;
}


function Layout({ title, children, className } : layoutProps) {
  return (
    <div className={cn('image', className)}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="">
          {children}
        </div>
    </div>
  );
}

export default Layout;