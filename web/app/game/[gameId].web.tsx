// app/game/[gameId].tsx
import { useLocalSearchParams } from "expo-router";
import GameScreen from "../../screens/GameScreen";

export default function Game() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  return <GameScreen gameId={gameId ?? ""} />;
}
