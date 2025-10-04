// routes.ts
import React from "react";

// Screens/components (you already have these)
import IndexScreen from "../screens/IndexScreen";
import GuestScreen from "../screens/GuestScreen";
import TestScreen from "../screens/TestScreen";
import LobbyScreen from "../screens/LobbyScreen";
import GameScreen from "../screens/GameScreen";

export function fillPath(path: string, params: Record<string, string | number>) {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (!(key in params)) {
      throw new Error(`Missing param '${key}' for path '${path}'`);
    }
    return String(params[key]);
  });
}

export function findRouteByPath(path: string) {
  for (const [key, route] of Object.entries(routes)) {
    // crude match: strip params
    if (route.hasParams) {
      const base = route.path.split("/:")[0]; // "/game"
      if (path.startsWith(base)) return { key, route };
    } else if (route.path === path) {
      return { key, route };
    }
  }
  throw new Error(`No route found for path '${path}'`);
}

export type RouteConfig = {
  path: string;               // expo-router path
  screen: string;             // RN screen name
  component: React.ComponentType<any>;
  hasParams?: boolean;        // if dynamic params needed
};
export type RouteDef = {
  screen: string;
  component: React.ComponentType<any>;
};
export type RoutesMap = Record<string, RouteDef>;

export const routes: Record<string, RouteConfig> = {
  Index: {
    path: "/",
    screen: "Index",
    component: IndexScreen,
  },
  Guest: {
    path: "/guest",
    screen: "Guest",
    component: GuestScreen,
  },
  Test: {
    path: "/test",
    screen: "Test",
    component: TestScreen,
  },
  Lobby: {
    path: "/lobby",
    screen: "Lobby",
    component: LobbyScreen,
  },
  Game: {
    path: "/game/:gameId",
    screen: "Game",
    component: ({ route }: any) => (
      <GameScreen gameId={route.params.gameId} />
    ),
    hasParams: true
  },
};
