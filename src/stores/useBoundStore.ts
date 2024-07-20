import { create } from "zustand";
import { createUserSlice, type IUserSlice } from "@/stores/slices/user.store";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createChatStore, type IChatSlice } from "@/stores/slices/chat.store";
import { createAuthSlice, type IAuthSlice } from "@/stores/slices/auth.store";
import { createNotificationsSlice, type INotificationsSlice } from "@/stores/slices/notifications.store.ts";

export type TMutators = [["zustand/devtools", never], ["zustand/immer", never]];

export type TCMutators = [["zustand/persist", unknown]];

export type TBoundState = IUserSlice &
  INotificationsSlice &
  IChatSlice &
  IAuthSlice;

export const useBoundStore = create<TBoundState>()(
  devtools(
    immer(
      persist(
        (...a) => ({
          ...createUserSlice(...a),
          ...createNotificationsSlice(...a),
          ...createChatStore(...a),
          ...createAuthSlice(...a),
        }),
        { name: "bound-store" }
      )
    )
  )
);
