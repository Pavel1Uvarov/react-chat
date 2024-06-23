import { create } from "zustand";
import { createUserSlice, IUserSlice } from "./user.store";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  createNotificationsSlice,
  INotificationsSlice,
} from "./notifications.store";
import { createChatStore, IChatSlice } from "./chat.store";
import { createAuthSlice, IAuthSlice } from "./auth.store";

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
