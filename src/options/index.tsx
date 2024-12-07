import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import Bears from "~components/bears"
import { listenForStorageChanges } from "~lib/listenForStorageChanges"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  useEffect(() => {
    listenForStorageChanges("popup")
  }, [])
  return <Bears />
}

export default PlasmoOverlay
