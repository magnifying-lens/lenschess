import React, { useState } from "react";
import { Box, Grid2 } from "@mui/material";
import "allotment/dist/style.css";

import TopBar from "./components/TopBar";
import useGetCurrentGameState from "./hooks/useGetCurrentGameState";
import LeftPanel from "./components/LeftPanel";
import LensChessBoard from "./Board";
import RightPanel from "./components/RightPanel";

const App: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<bigint | null>(null);
  const { game: currentGame } = useGetCurrentGameState({
    gameId: selectedGameId ?? undefined,
  });

  return (
    <>
      <TopBar game={currentGame} />
      <Grid2
        container
        spacing={2}
        sx={{ height: "calc(100vh - yourTopBarHeight)", flexGrow: 1 }}
      >
        <Grid2
          size={{ xs: 12, md: 3 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <LeftPanel
            onSelectGame={setSelectedGameId}
            selectedGameId={selectedGameId}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 5.5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <LensChessBoard game={currentGame} />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 3 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Box mt={3}>
            <RightPanel />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default App;
