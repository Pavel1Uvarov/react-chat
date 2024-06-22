import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

interface INotificationsStore {
  playSoundNotification: boolean;
  togglePlaySoundNotification: () => void;
}

export const useNotificationsStore = createWithEqualityFn<INotificationsStore>()(devtools(immer((set) => (
  {
    playSoundNotification: false,
    togglePlaySoundNotification: async () => {
      set((state) => {
        state.playSoundNotification = true;
      });

      setTimeout(() => {
        set((state) => {
          state.playSoundNotification = false;
        });
      }, 1000)
    }
  }
))), shallow);

export const selectPlaySoundNotification = (state: INotificationsStore) => state.playSoundNotification;
export const selectTogglePlaySoundNotification = (state: INotificationsStore) => state.togglePlaySoundNotification;