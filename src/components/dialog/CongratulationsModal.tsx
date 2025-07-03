import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import { Button } from "../ui/button";
import type { Country } from "@/types/game";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  availableCountries: Country[];
  onUnlockCountry: (countryId: string) => void;
};

const CongratulationsModal = ({
  open,
  setOpen,
  availableCountries,
  onUnlockCountry,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trophy className="h-6 w-6 text-primary" />
            <h3 className="text-lg">Congratulations!</h3>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h3 className="text-xl font-semibold">Country Completed!</h3>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                Great job! You've successfully completed this country with a
                score of 80% or higher. Choose your next destination to continue
                your PharmaQuest adventure.
              </p>
            </div>
          </div>

          {availableCountries.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-medium text-center">
                Choose your next destination:
              </h4>
              <div className="grid gap-3">
                {availableCountries.map((country) => (
                  <Button
                    key={country.id}
                    variant="outline"
                    onClick={() => onUnlockCountry(country.id)}
                  >
                    <span className="font-medium">{country.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">
                Amazing! You've unlocked all available countries. Continue
                exploring!
              </p>
              <Button onClick={() => setOpen(false)} className="mt-4">
                Continue
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CongratulationsModal;
