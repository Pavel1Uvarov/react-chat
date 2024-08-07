import type { StateCreator } from "zustand";
import type { TCMutators, TMutators } from "@/stores/useBoundStore";

export interface INotificationsSlice {
  playSoundNotification: boolean;
  togglePlaySoundNotification: () => void;
}

export const createNotificationsSlice: StateCreator<
  INotificationsSlice,
  TMutators,
  TCMutators
> = (set) => ({
  playSoundNotification: false,
  togglePlaySoundNotification: async () => {
    set((state) => {
      state.playSoundNotification = true;
    });

    setTimeout(() => {
      set((state) => {
        state.playSoundNotification = false;
      });
    }, 1000);
  },
});
export const selectPlaySoundNotification = (state: INotificationsSlice) =>
  state.playSoundNotification;
export const selectTogglePlaySoundNotification = (state: INotificationsSlice) =>
  state.togglePlaySoundNotification;
