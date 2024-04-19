import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IGlobalState {
  isAnyModalOpen: boolean;
  isEditorMode: boolean;
  canvasAreaElement: HTMLDivElement | null;
}

const initialState = { isAnyModalOpen: false, isEditorMode: true, canvasAreaElement: null };

export const useAppGlobalStore = create<IGlobalState>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        setIsAnyModalOpen: (isAnyModalOpen: boolean) => set(() => ({ isAnyModalOpen })),
        setCanvasAreaElement: (canvasAreaElement: HTMLDivElement | null) => set(() => ({ canvasAreaElement })),
        changeIsEditorMode: (isEditorMode: boolean) => set(() => ({ isEditorMode })),
      },
    }),
    { name: 'App Global Store' }
  )
);
