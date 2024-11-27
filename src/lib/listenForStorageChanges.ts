import { useBearStore } from "~stores/useBearStore"

export const listenForStorageChanges = (page: string) => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("changes on page", page, changes, "namespace", namespace)
    if (namespace === "local") {
      if (changes.useBearStore) {
        console.log("Bear store changed!")
        useBearStore.setState(changes.useBearStore.newValue.state)
      }
    }
  })
}
