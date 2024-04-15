import { create } from "zustand";
type PlacementType = "top" | "bottom";

interface ToastState {
  message: string;
  duration?: number;
  placement?: PlacementType;
  setMessage: (message: string) => void;
  setDuration: (duration: number) => void;
  setPlacement: (placement: PlacementType) => void;
}

export const useToast = create<ToastState>((set) => ({
  message: "",
  duration: 5000,
  placement: "top",

  setMessage(message: string) {
    set((state) => ({ message: message }));
  },
  setDuration(duration: number) {
    set((state) => ({ duration: duration }));
  },
  setPlacement(placement: PlacementType) {
    set((state) => ({ placement: placement }));
  },
}));
