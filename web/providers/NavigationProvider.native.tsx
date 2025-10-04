// NavigationProvider.native.tsx
import React, { createContext, useContext } from "react";
import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import type { ParamListBase } from "@react-navigation/native";
import { routes, findRouteByPath } from "../routes/routes";

type NavContext = {
  push: (screen: string, params?: any) => void;
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

const NavigationContext = createContext<NavContext | null>(null);

// export this ref so App.tsx can attach it to NavigationContainer
export const navigationRef = createNavigationContainerRef<ParamListBase>();

export const useAppNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useAppNavigation must be used within NavigationProvider");
  return ctx;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const push = (path: string) => {
    console.log("NATIVE push", path);
    const { route } = findRouteByPath(path);

    if (navigationRef.isReady()) {
      if (route.hasParams) {
        // Extract param values from path
        const base = route.path.split("/:")[0]; // e.g. "/game"
        const value = path.replace(base + "/", ""); // e.g. "ASDFGH"
        navigationRef.navigate(route.screen, { gameId: value });
      } else {
        navigationRef.navigate(route.screen);
      }
    } else {
      console.warn("Navigation not ready yet (push)", route);
    }
  };



  const navigate = (screen: keyof typeof routes, params: Record<string, any> = {}) => {
    console.log("RWC Android Navigating to", screen, params);
    if (navigationRef.isReady()) {
      navigationRef.navigate(screen, params);
    } else {
      console.warn("Navigation not ready yet (navigate)", screen);
    }
  };


  const goBack = () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) navigationRef.goBack();
  };

  return (
    <NavigationContext.Provider value={{ push, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};
