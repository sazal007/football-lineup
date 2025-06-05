import { useState, useEffect, useRef } from "react";

import {
  FootballPitchProps,
  PlayerData,
  PlayerPosition,
} from "../../utils/types";
import { PlayerCircle } from "../../components/pitch";
import PlayerModal from "./PlayerModal";
import { searchPlayersByName } from "./playerSearch";

/**
 * todo: add player search
 * https://api.lineup-builder.co.uk/api/25/player?name=neymar
 */

export default function FootballPitch({
  formation,
  positions,
  showFormation,
  flipPlayers,
  squadTitle,
  subtitle,
  showClubBadge,
  showManager,
  teamCaptain,
  manOfTheMatch,
  onPositionsChange,
}: FootballPitchProps) {
  const pitchRef = useRef<HTMLDivElement>(null);
  const [playerPositions, setPlayerPositions] = useState(positions);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update positions when formation changes or when flipped
  useEffect(() => {
    const newPositions = flipPlayers
      ? positions.map((pos) => ({ ...pos, y: 100 - pos.y }))
      : positions;

    setPlayerPositions(newPositions);
  }, [positions, flipPlayers]);

  // Notify parent component when positions change
  useEffect(() => {
    if (onPositionsChange) {
      onPositionsChange(playerPositions);
    }
  }, [playerPositions, onPositionsChange]);

  // Handle player search when typing
  useEffect(() => {
    const searchPlayers = async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        try {
          const results = await searchPlayersByName(searchTerm);
          // console.log(results);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching for players:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimeout = setTimeout(searchPlayers, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  // Handle selecting a player from search results
  const handleSelectPlayer = (player: PlayerData) => {
    if (selectedPlayerIndex !== null) {
      setPlayerPositions((prevPositions) =>
        prevPositions.map((position, index) =>
          index === selectedPlayerIndex
            ? {
                ...position,
                playerData: player,
              }
            : position
        )
      );
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  // Handle clearing player data
  const handleClearPlayerData = () => {
    if (selectedPlayerIndex !== null) {
      setPlayerPositions((prevPositions) =>
        prevPositions.map((position, index) =>
          index === selectedPlayerIndex
            ? {
                ...position,
                playerData: undefined,
              }
            : position
        )
      );
    }
  };

  // Handle dragging player positions
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = Number.parseInt(e.dataTransfer.getData("text/plain"));
    const rect = pitchRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPlayerPositions((prevPositions) =>
      prevPositions.map((position, index) =>
        index === id
          ? {
              ...position,
              x: Math.max(5, Math.min(95, x)),
              y: Math.max(5, Math.min(95, y)),
            }
          : position
      )
    );
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Assert event.target as HTMLElement
      const target = event.target as HTMLElement;

      // Check if the target is outside the modal
      if (modalOpen && !target.closest(".modal")) {
        setModalOpen(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div
      ref={pitchRef}
      className="w-full h-full mt-[2rem] relative rounded-[1.3%] overflow-hidden border border-[#444]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Title and Subtitle Display */}
      <div className="absolute top-[0%] right-3 flex flex-col items-center z-20">
        <h1 className="text-[min(10vw,2rem)] font-bold text-white tracking-wider uppercase">
          {squadTitle || ""}
        </h1>
        <h2 className="text-[min(6vw,1.5rem)] text-[#4ade80] font-medium tracking-wide lowercase">
          {subtitle || ""}
        </h2>
      </div>

      {/* Pitch background */}
      <div className="absolute inset-0 bg-[#2b4235] flex items-center justify-center">
        {/* Formation display */}
        {showFormation && (
          <div className="absolute top-[2%] left-[5rem] transform -translate-x-1/2 bg-[#1a2e22] px-3 py-1 rounded text-[#4ade80] text-sm font-bold border border-[#4ade80] z-10">
            <div className="text-center">{formation}</div>
          </div>
        )}

        {/* Field markings */}
        <div className="absolute inset-0">
          {/* Outer border */}
          <div className="absolute inset-5 border border-[#4ade80] opacity-30 rounded"></div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] h-[19%] rounded-full border border-[#4ade80] opacity-30"></div>

          {/* Center line */}
          <div className="absolute top-1/2 left-5 right-5 h-px bg-[#4ade80] opacity-30 transform -translate-y-1/2"></div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#4ade80] opacity-30 rounded-full"></div>

          {/* Penalty areas */}
          <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[60%] h-[15%] border border-[#4ade80] opacity-30"></div>
          <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[60%] h-[15%] border border-[#4ade80] opacity-30"></div>

          {/* Goal areas */}
          <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-[30%] h-[5%] border border-[#4ade80] opacity-30"></div>
          <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[30%] h-[5%] border border-[#4ade80] opacity-30"></div>
        </div>

        {/* Bottom section with badges and manager */}
        <div className="absolute bottom-[5%] -left-8 right-0 flex flex-col justify-center gap-3 px-[10%] z-20">
          {/* Left badge */}
          {showClubBadge && (
            <div className="flex items-center gap-2">
              <PlayerCircle>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </PlayerCircle>
            </div>
          )}

          {/* Manager */}
          {showManager && (
            <PlayerCircle>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </PlayerCircle>
          )}
        </div>

        {/* Player positions */}
        {playerPositions.map((position, index) => {
          const isTeamCaptain = teamCaptain === `Player ${index + 1}`;
          const isMotm = manOfTheMatch === `Player ${index + 1}`;

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              onClick={() => {
                setSelectedPlayerIndex(index);
                setModalOpen(true);
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
            >
              <div className="mb-3 text-xs text-white opacity-75">
                {position.role}
              </div>
              <div className="relative flex flex-col items-center">
                {/* Absolutely positioned icons above the circle */}
                {(isTeamCaptain || isMotm) && (
                  <div className="absolute -top-1 -right-1/4 -translate-x-1/2 flex gap-1 z-10">
                    {isTeamCaptain && (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow">
                        <span className="text-[10px] font-bold text-black">
                          C
                        </span>
                      </div>
                    )}
                    {isMotm && (
                      <div className="w-4 h-4 bg-[#4ade80] rounded-full flex items-center justify-center shadow">
                        <span className="text-[10px] font-bold text-black">
                          ★
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {/* Player circle */}
                <PlayerCircle playerData={position.playerData}>
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </PlayerCircle>
              </div>
            </div>
          );
        })}
      </div>

      <PlayerModal
        open={modalOpen}
        playerIndex={selectedPlayerIndex}
        playerPositions={playerPositions as unknown as PlayerPosition[]}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        isLoading={isLoading}
        onClose={() => setModalOpen(false)}
        onSelectPlayer={handleSelectPlayer}
        onClearPlayerData={handleClearPlayerData}
      />
    </div>
  );
}
