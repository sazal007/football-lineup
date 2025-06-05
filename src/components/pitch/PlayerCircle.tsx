import { PlayerData } from '../../utils/types';

interface PlayerCircleProps {
  children?: React.ReactNode;
  playerData?: PlayerData;
  className?: string;
}

export function PlayerCircle({ children, playerData, className = "" }: PlayerCircleProps) {
  return (
    <div className="relative">
      <div className={`w-10 h-10 rounded-full border-2 border-dashed border-[#4ade80] flex items-center justify-center bg-[#2a2a2a] overflow-hidden ${className}`}>
        {playerData?.imgSrc ? (
          <img 
            src={playerData.imgSrc.trim()} 
            alt={playerData.shortName || "Player"} 
            className="w-full h-full object-cover"
          />
        ) : (
          children
        )}
      </div>
      {playerData?.shortName && (
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-[#1a2e22] px-1 rounded whitespace-nowrap">
          {playerData.shortName}
        </div>
      )}
    </div>
  );
}