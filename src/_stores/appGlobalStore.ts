import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IGlobalState {
  isEditorMode: boolean;
  canvasAreaElement: HTMLDivElement | null;
}

const initialState = { isEditorMode: true, canvasAreaElement: null };

export const useAppGlobalStore = create<IGlobalState>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        setCanvasAreaElement: (canvasAreaElement: HTMLDivElement | null) => set(() => ({ canvasAreaElement })),
        changeIsEditorMode: (isEditorMode: boolean) => set(() => ({ isEditorMode })),
      },
    }),
    { name: 'App Global Store' }
  )
);
