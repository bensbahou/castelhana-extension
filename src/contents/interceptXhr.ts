import type { PlasmoCSConfig } from "plasmo"

import { interceptXhr } from "~lib/interceptXhrFn"
import { parseCleanProject } from "~lib/parseCleanProject"
import type { Project, ProjectsData } from "~types/project"

export const config: PlasmoCSConfig = {
  matches: ["https://www.castelhana.pt/*"],
  world: "MAIN",
  run_at: "document_start"
}

console.log("Intercepting XHR and Fetch...")

// Add this interface before the handleXhrLoad function

function handleXhrLoad(this: XMLHttpRequest, args: [string, ...any[]]) {
  const url = this.responseURL
  const method = args[0]
  console.log(`XHR Response ${method}:`, url, this.status)
  if (
    url.startsWith(
      "https://websiteapi.egorealestate.com/v1/Developments/full?restparams=site"
    )
  ) {
    const data = JSON.parse(this.responseText) as {
      Developments: Project[]
      FallBackSearch: boolean
      TotalRecords: number
    }
    console.log("XHR JSON:", url, this.status, data)

    // Updated event creation with proper typing
    const customEvent = new CustomEvent<ProjectsData>("castelhanaApiData", {
      detail: {
        Developments: data.Developments.map(parseCleanProject),
        FallBackSearch: data.FallBackSearch,
        TotalRecords: data.TotalRecords
      }
    })
    document.dispatchEvent(customEvent)
  }
}

interceptXhr(handleXhrLoad)
