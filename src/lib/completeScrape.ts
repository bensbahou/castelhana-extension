import type { CleanProject, Project } from "~types/project"

export const scrapeProject = async (project: CleanProject) => {
  console.log("project to complete: ", project.Link)
  // create a tab and navigate to the project link
  const tab = await chrome.tabs.create({ url: "about:blank", active: false })

  // Use chrome.tabs.update to perform the navigation
  await chrome.tabs.update(tab.id, { url: project.Link })

  // Wait for the tab to complete loading
  await new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener)
        resolve(true)
      }
    })
  })
  // execute the script to scrape the project
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async () => {
      let table = null
      let attempts = 0
      while (!table && attempts < 30) {
        table = document.querySelector("table.factionsTable")
        console.log("table", table)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return "success"
    }
  })
  console.log("project completed", project.Link)
  // close the tab
  await chrome.tabs.remove(tab.id)
}
