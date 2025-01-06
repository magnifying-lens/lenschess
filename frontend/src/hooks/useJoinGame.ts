import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { lensChessAbi } from "../generated";

interface Props {
  onSuccess: (gameId: bigint) => void;
}

export default function useJoinGame({ onSuccess }: Props) {
  const { writeContract, isPending } = useWriteContract();

  const joinGame = useCallback(
    (gameId: bigint) => {
      writeContract(
        {
          abi: lensChessAbi,
          address: import.meta.env.VITE_LENSCHESS_ADDRESS,
          functionName: "joinGame",
          args: [gameId],
        },
        {
          onSuccess(_data, _variables, _context) {
            onSuccess(gameId);
          },
        }
      );
    },
    [onSuccess]
  );

  return { joinGame, isPending };
}
