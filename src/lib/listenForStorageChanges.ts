import { useProjectsDataStore } from "~stores/useProjectsDataStore"

export const listenForStorageChanges = (page: string) => {
  // Add listener for changes in Chrome's storage
  chrome.storage.onChanged.addListener((changes, namespace) => {
    // Log storage changes and the page where they occurred
    console.log("changes on page", page, changes, "namespace", namespace)

    // Only handle changes in local storage
    if (namespace === "local") {
      // Check if the projects data store was modified
      if (changes.useProjectsDataStore) {
        console.log("Projects data store changed!")
        // Update the Zustand store with the new state from storage
        useProjectsDataStore.setState(
          changes.useProjectsDataStore.newValue.state
        )
      }
    }
  })
}
