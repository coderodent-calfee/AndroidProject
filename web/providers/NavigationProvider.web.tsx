// NavigationProvider.tsx  for web
import React, { createContext, useContext } from "react";
import { Href, useRouter } from "expo-router";
import {routes, fillPath} from "../routes/routes";

type NavContext = {
  push: (path: string) => void;
  navigate: (screen: keyof typeof routes, params?: Record<string, any>) => void;
  goBack: () => void;
};

const NavigationContext = createContext<NavContext | null>(null);

export const useAppNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useAppNavigation must be used within NavigationProvider");
  return ctx;
};

function normalizeToPath(screen: string): Href {
  if (!screen) return "/";
  if (screen.startsWith("/")) return screen as Href;
  const s = screen.toLowerCase();
  if (s === "index" || s === "home") return "/";
  return `/${s}` as Href;
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const push = (path: string) => {
    console.log("WEB push", path);
    // expo-router works directly with paths
    router.push(path as Href);
  };
  
  const navigate = (screen: keyof typeof routes, params: Record<string, any> = {}) => {
    const route = routes[screen];
    if (!route) throw new Error(`Unknown route: ${screen}`);
    const url = route.hasParams ? fillPath(route.path, params) : route.path;
    router.push(url as Href);
  };

  const goBack = () => router.back?.();

  return (
    <NavigationContext.Provider value={{ push, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};
