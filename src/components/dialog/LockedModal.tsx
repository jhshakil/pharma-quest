import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import type { Country } from "@/types/game";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  country: Country;
};

const LockedModal = ({ open, setOpen, country }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Lock className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg">Country Locked</h3>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">{country.name}</h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                This country is locked. You need to unlock it first by
                completing the current country with at least 80% score.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => setOpen(false)} className="px-8">
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LockedModal;
