import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { parseCleanProject } from "~lib/parseCleanProject"
import { useProjectsDataStore } from "~stores/useProjectsDataStore"
import type { CleanProject, ProjectsData } from "~types/project"

export {}
console.log("Storage change listener initialized!")

listenForStorageChanges("content")

document.addEventListener(
  "castelhanaApiData",
  (event: CustomEvent<ProjectsData>) => {
    //console.log("castelhanaApiData event:", event.detail)
    useProjectsDataStore.setState((state) => {
      const uniqueDevelopments = [
        ...state.Developments,
        ...event.detail.Developments
      ].reduce((unique, development) => {
        const exists = unique.find(
          (item) => item.Referencia === development.Referencia
        )
        if (!exists) {
          unique.push(development)
        }
        return unique
      }, [] as CleanProject[])

      return {
        ...event.detail,
        Developments: uniqueDevelopments
      }
    })
  }
)
