import { useState, useEffect } from "react";
import { Button, Input, Switch } from "../../components/common";
import FootballPitch from "../pitch/footballpitch";
import { FORMATIONS } from "../../data/formation";
import { Formation, PlayerCount } from "../../utils/types";

type DisplayOptions = {
  formation: boolean;
  clubBadge: boolean;
  manager: boolean;
  flipPlayers: boolean;
};

export default function LineupBuilder() {
  // Add new state variables
  const [playerCount, setPlayerCount] = useState<PlayerCount>(11);
  const [selectedFormation, setSelectedFormation] = useState<Formation>(
    FORMATIONS[11][1]
  ); // 4-4-1-1
  const [teamCaptain, setTeamCaptain] = useState<string>("None");
  const [manOfTheMatch, setManOfTheMatch] = useState<string>("None");

  const [squadTitle, setSquadTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    formation: true,
    clubBadge: false,
    manager: false,
    flipPlayers: false,
  });

  // Update formation when player count changes
  useEffect(() => {
    setSelectedFormation(FORMATIONS[playerCount][0]);
  }, [playerCount]);

  const handleToggleOption = (option: keyof DisplayOptions) => {
    setDisplayOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="w-full max-w-5xl bg-[#2a2a2a] rounded-lg overflow-hidden shadow-xl">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 p-4 bg-[#252525]">
          <div className="mb-4">
            <label
              htmlFor="squad-title"
              className="block text-sm text-gray-300 mb-1"
            >
              Squad Title
            </label>
            <Input
              id="squad-title"
              value={squadTitle}
              onChange={(e) => setSquadTitle(e.target.value)}
              placeholder="SQUAD NAME"
              className="bg-[#333] border-0 text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="subtitle"
              className="block text-sm text-gray-300 mb-1"
            >
              Subtitle
            </label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="subtitle"
              className="bg-[#333] border-0 text-white"
            />
          </div>
          {/* Player Count Selection */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Player Count
            </label>
            <div className="flex gap-2">
              {[5, 7, 11].map((count) => (
                <button
                  key={count}
                  onClick={() => setPlayerCount(count as PlayerCount)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    playerCount === count
                      ? "bg-[#4ade80] text-black"
                      : "bg-[#333] text-white hover:bg-[#444]"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Formation Selection */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Formation
            </label>
            <select
              value={selectedFormation.name}
              onChange={(e) => {
                const formation = FORMATIONS[playerCount].find(
                  (f) => f.name === e.target.value
                );
                if (formation) setSelectedFormation(formation);
              }}
              className="w-full bg-[#333] text-white border-0 rounded-md p-2"
            >
              {FORMATIONS[playerCount].map((formation) => (
                <option key={formation.name} value={formation.name}>
                  {formation.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team Captain Selection */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Team Captain
            </label>
            <select
              value={teamCaptain}
              onChange={(e) => setTeamCaptain(e.target.value)}
              className="w-full bg-[#333] text-white border-0 rounded-md p-2"
            >
              <option value="None">None</option>
              {selectedFormation.positions.map((pos, idx) => (
                <option key={idx} value={`Player ${idx + 1}`}>
                  {`Player ${idx + 1} (${pos.role})`}
                </option>
              ))}
            </select>
          </div>

          {/* Man of the Match Selection */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Man of the Match
            </label>
            <select
              value={manOfTheMatch}
              onChange={(e) => setManOfTheMatch(e.target.value)}
              className="w-full bg-[#333] text-white border-0 rounded-md p-2"
            >
              <option value="None">None</option>
              {selectedFormation.positions.map((pos, idx) => (
                <option key={idx} value={`Player ${idx + 1}`}>
                  {`Player ${idx + 1} (${pos.role})`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Display formation</span>
              <Switch
                checked={displayOptions.formation}
                onChange={() => handleToggleOption("formation")}
                className="bg-gray-700 data-checked:bg-[#4ade80]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Display club badge</span>
              <Switch
                checked={displayOptions.clubBadge}
                onChange={() => handleToggleOption("clubBadge")}
                className="bg-gray-700 data-checked:bg-[#4ade80]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Display manager</span>
              <Switch
                checked={displayOptions.manager}
                onChange={() => handleToggleOption("manager")}
                className="bg-gray-700 data-checked:bg-[#4ade80]"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Flip players</span>
              <Switch
                checked={displayOptions.flipPlayers}
                onChange={() => handleToggleOption("flipPlayers")}
                className="bg-gray-700 data-checked:bg-[#4ade80]"
              />
            </div>
          </div>
        </div>

        {/* Main content - Football pitch */}
        <div className="flex-1 p-4 flex flex-col items-center">
          <div className="w-full max-w-md aspect-[3/4] relative">
            <FootballPitch
              formation={selectedFormation.name}
              positions={selectedFormation.positions}
              showFormation={displayOptions.formation}
              flipPlayers={displayOptions.flipPlayers}
              squadTitle={squadTitle}
              subtitle={subtitle}
              showClubBadge={displayOptions.clubBadge}
              showManager={displayOptions.manager}
              teamCaptain={teamCaptain}
              manOfTheMatch={manOfTheMatch}
            />
          </div>
          <Button className="mt-12 bg-[#4ade80] hover:bg-[#3ac070] text-black font-medium px-8">
            Save & Share
          </Button>
        </div>
      </div>
    </div>
  );
}
