import { useBearStore } from "~stores/useBearStore"

export {}

console.log(
  "Background script from",
  chrome.runtime.getManifest().name,
  chrome.runtime.getManifest()
)
