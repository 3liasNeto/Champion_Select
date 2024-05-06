import React, { useCallback } from "react";
import { Sides, Team, teamSides } from "../types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface BanProps {
  champions: Team | undefined;
  sideBan: keyof Sides;
}

const Bans: React.FC<BanProps> = ({ champions, sideBan }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.set("side", sideBan);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div
      className={`absolute top-[30px]  ${
        sideBan === "BlueBans" ? "left-[110px]" : "right-[110px]"
      }`}
    >
      {champions !== undefined && (
        <div className="flex flex-row gap-2">
          {Object.entries(champions).map(([position, player]) =>
            player !== undefined ? (
              <div
                key={`${position}`}
                className="relative w-[42px] h-[42px] teamBorder border border-[#c8aa6e52] rounded-sm"
              >
                <Image
                  src={player.image}
                  alt={player.name}
                  width={42}
                  height={42}
                  onClick={() => {
                    router.push(
                      pathname + "?" + createQueryString("lane", position)
                    );
                  }}
                  className="grayscale-[60]"
                />
                <div className="ban">
                  <div className="bannedImage opacity-80"></div>
                </div>
              </div>
            ) : (
              <div
                key={position}
                className="bg-[#1D272A]/70 backdrop-blur w-[42px] h-[42px] mb-2 teamBorder border border-[#c8aa6e52] rounded-sm
                flex items-center justify-center
                "
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("lane", position)
                  );
                }}
              >
               <Image
                  src={"/champion.png"}
                  alt="champion"
                  width={18}
                  height={18}
                  onClick={() => {
                    router.push(
                      pathname + "?" + createQueryString("lane", position)
                    );
                  }}
                  className="fillColor"
                />


              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Bans;
