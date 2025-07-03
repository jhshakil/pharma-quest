import type { Country } from "@/types/game";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  countries: Country[];
  onCountryClick: (country: Country) => void;
};

const WorldMap = ({ countries, onCountryClick }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/map.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[70vh] relative"
    >
      {countries?.map((country) => (
        <div
          key={country.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${country.position.x}%`,
            top: `${country.position.y}%`,
          }}
        >
          <Button
            size={"sm"}
            onClick={() => onCountryClick(country)}
            disabled={!country.unlocked}
            className={cn(
              country.unlocked &&
                "hover:scale-110 active:scale-95 hover:text-md",
              "text-md"
            )}
          >
            {country.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default WorldMap;
