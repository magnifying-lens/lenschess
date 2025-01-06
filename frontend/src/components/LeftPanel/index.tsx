import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Leaderboard from "./Leaderboard";
import Challenges from "./Challenges";
import MyGames from "./MyGames";
import GameList from "../GameList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  selectedGameId: bigint | null;
  onSelectGame: (gameId: bigint) => void;
}

export default function LeftPanel({ onSelectGame, selectedGameId }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="All Games" {...a11yProps(0)} />
          <Tab label="Active Games" {...a11yProps(1)} />
          <Tab label="Challenges" {...a11yProps(2)} />
          <Tab label="Leaderboard" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GameList onSelectGame={onSelectGame} selectedGameId={selectedGameId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyGames onSelectGame={onSelectGame} selectedGameId={selectedGameId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Challenges onSelectGame={onSelectGame} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Leaderboard />
      </CustomTabPanel>
    </Box>
  );
}
