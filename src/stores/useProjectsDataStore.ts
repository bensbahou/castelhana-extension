import { create } from "zustand"
import { persist } from "zustand/middleware"

import { chromeStorage } from "~lib/chromeStorage"
import type { CleanProject, ProjectsData } from "~types/project"

import { initialProjectsData } from "./initialStates/initialProjectsData"

interface ProjectsDataState extends ProjectsData {
  setProjectsData: (state: Partial<ProjectsData>) => void
  addProjects: (projects: CleanProject[]) => void
  reset: () => void
  updateProject: (project: CleanProject) => void
}

export const useProjectsDataStore = create<ProjectsDataState>()(
  persist(
    (set, get) => ({
      ...initialProjectsData,
      setProjectsData: (state) => set(state),
      addProjects: (projects) =>
        set((state) => ({
          ...state,
          Developments: [...state.Developments, ...projects]
        })),
      reset: () => set(initialProjectsData),
      updateProject: (project) =>
        set((state) => ({
          ...state,
          Developments: state.Developments.map((p) =>
            p.ID === project.ID ? project : p
          )
        }))
    }),
    {
      name: "useProjectsDataStore",
      storage: chromeStorage as any
    }
  )
)
