
import LensChessBoard from "../Board";
import { Game } from "../types";

interface Props {
  game?: Game;
}

const Chessboard = ({ game }: Props) => {
  return (
    <div style={{ flexGrow: 2, padding: 20 }}>
      <LensChessBoard game={game} />
    </div>
  );
};

export default Chessboard;
