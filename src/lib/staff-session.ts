import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StaffProfile } from "./types";

type StaffState = {
  token: string | null;
  staff: StaffProfile | null;
  setSession: (token: string, staff: StaffProfile) => void;
  clear: () => void;
};

export const useStaffSession = create<StaffState>()(
  persist(
    (set) => ({
      token: null,
      staff: null,
      setSession: (token, staff) => set({ token, staff }),
      clear: () => set({ token: null, staff: null }),
    }),
    { name: "cheeziup-staff" },
  ),
);
