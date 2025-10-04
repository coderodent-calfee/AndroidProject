// UIContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Dimensions, ScaledSize, StyleSheet } from "react-native";

// ------------------ Types ------------------
interface AppStyles {
    columnFlow: { flex: number; flexDirection: "column" };
    rowFlow: { flex: number; flexDirection: "row" };
    largeText: { color: string; fontSize: number };
    mediumText: { color: string; fontSize: number };
    smallText: { color: string; fontSize: number };
    smallestText?: { color: string; fontSize: number };
}

interface ScreenSize {
    corner: number;
    width: number;
    height: number;
    scale: number;
    fontScale: number;
}

interface UIContextType {
    appStyles: AppStyles;
    screenSize: ScreenSize;
}

// ------------------ Context ------------------
const UIContext = createContext<UIContextType | undefined>(undefined);

// ------------------ Provider ------------------
export const UIProvider = ({ children }: { children: ReactNode }) => {
    const getScreenSize = (): ScreenSize => {
        const { width, height, scale, fontScale } = Dimensions.get("window");
        return {
            corner: Math.min(width, height) * 0.15, // example: 5% of shorter side
            width,
            height,
            scale,
            fontScale,
        };
    };

    const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

    useEffect(() => {
        const handleResize = ({ window }: { window: ScaledSize }) => {
            setScreenSize({
                corner: Math.min(window.width, window.height) * 0.05,
                width: window.width,
                height: window.height,
                scale: window.scale,
                fontScale: window.fontScale,
            });
        };

        const subscription = Dimensions.addEventListener("change", handleResize);

        return () => {
            subscription?.remove();
        };
    }, []);

    const appStyles: AppStyles = StyleSheet.create({
        columnFlow: { flex: 1, flexDirection: "column" },
        rowFlow: { flex: 1, flexDirection: "row" },
        largeText: { color: "white", fontSize: 30 },
        mediumText: { color: "white", fontSize: 20 },
        smallText: { color: "white", fontSize: 15 },
        smallestText: { color: "white", fontSize: 10 },

    });





    return (
        <UIContext.Provider value={{ appStyles, screenSize }}>
            {children}
        </UIContext.Provider>
    );
};

// ------------------ Hook ------------------
export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI must be used within a UIProvider");
    return context;
};
