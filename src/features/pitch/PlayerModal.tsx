import React from "react";
import { PlayerData, PlayerPosition } from "../../utils/types";

interface PlayerModalProps {
  open: boolean;
  playerIndex: number | null;
  playerPositions: PlayerPosition[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  searchResults: PlayerData[];
  isLoading: boolean;
  onClose: () => void;
  onSelectPlayer: (player: PlayerData) => void;
  onClearPlayerData: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  open,
  playerIndex,
  playerPositions,
  searchTerm,
  setSearchTerm,
  searchResults,
  isLoading,
  onClose,
  onSelectPlayer,
  onClearPlayerData,
}) => {
  if (!open || playerIndex === null) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal">
      <div className="bg-green-100 p-6 rounded-lg relative w-[350px] max-w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">
          Player {playerPositions[playerIndex].role}
        </h2>

        {/* Show player data if it exists */}
        {playerPositions[playerIndex]?.playerData ? (
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              {playerPositions[playerIndex].playerData?.imgSrc && (
                <img
                  src={playerPositions[playerIndex].playerData?.imgSrc.trim()}
                  alt={
                    playerPositions[playerIndex].playerData?.shortName ||
                    "Player"
                  }
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#4ade80]"
                />
              )}
              <div>
                <div className="font-bold text-lg">
                  {playerPositions[playerIndex].playerData?.knownName ||
                    playerPositions[playerIndex].playerData?.shortName}
                </div>
                <div className="text-sm text-gray-600">
                  {playerPositions[playerIndex].playerData?.club} •
                  {playerPositions[playerIndex].playerData?.nationality}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#4ade80] text-white text-xs px-2 py-0.5 rounded-full">
                    Rating: {playerPositions[playerIndex].playerData?.rating}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    #{playerPositions[playerIndex].playerData?.kitNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Positions */}
            {playerPositions[playerIndex].playerData?.positions && (
              <div className="mb-4">
                <div className="text-sm font-bold mb-1">Positions:</div>
                <div className="flex flex-wrap gap-1">
                  {playerPositions[playerIndex].playerData?.positions.map(
                    (pos: string, i: number) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded"
                      >
                        {pos}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Clear button */}
            <button
              onClick={onClearPlayerData}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Clear Player Data
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block">
              <span className="text-sm font-bold">Player Name</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-3 py-2 rounded-md shadow-sm focus:ring-[#4ade80] focus:border-[#4ade80] border-gray-300"
                placeholder="Search for a player"
              />
            </label>
          </div>
        )}

        {/* Search Results - only show if no player data is set */}
        {!playerPositions[playerIndex]?.playerData && (
          <>
            {isLoading && <div className="text-center py-2">Loading...</div>}

            {!isLoading && searchResults.length > 0 && (
              <div className="max-h-[200px] overflow-y-auto border border-gray-200 rounded-md mb-4">
                {searchResults.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-2 p-2 hover:bg-green-200 cursor-pointer border-b border-gray-200 last:border-b-0"
                    onClick={() => onSelectPlayer(player)}
                  >
                    {player.imgSrc && (
                      <img
                        src={player.imgSrc.trim()}
                        alt={player.shortName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-bold">{player.shortName}</div>
                      <div className="text-xs text-gray-600">
                        {player.club} • {player.positions?.join(", ")}
                      </div>
                    </div>
                    <div className="ml-auto text-sm font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                      {player.rating}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading &&
              searchTerm.length >= 3 &&
              searchResults.length === 0 && (
                <div className="text-center py-2 text-gray-600">
                  No players found
                </div>
              )}

            {searchTerm.length > 0 && searchTerm.length < 3 && (
              <div className="text-center py-2 text-gray-600">
                Type at least 3 letters to search
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerModal;
