import type { ProjectsData } from "~types/project"

export const initialProjectsData = {
  Developments: [],
  FallBackSearch: false,
  TotalRecords: 0
} as const satisfies ProjectsData
