import { BASE_URL } from "~constants/config"
import type { CleanProject, Project } from "~types/project"

export const parseCleanProject = (project: Project): CleanProject => {
  const cleanProject = {
    ID: project.ID,
    Name: project.Name,
    Broker: "Castelhana",
    Link: `${BASE_URL}${project.ID}`,
    District: project.District,
    Municipality: project.Municipality,
    Parish: project.Parish,
    Zone: project.Zone,
    Status: project.Status,
    Referencia: project.Reference,
    fractions: [],
    DateOfExtraction: new Date().toISOString(),
    Infraestruturas: ""
  }
  return cleanProject
}
