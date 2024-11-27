import { useEffect } from "react"

import Bears from "~components/ui/bears"
import { listenForStorageChanges } from "~lib/listenForStorageChanges"

import "~style.css"

function IndexPopup() {
  useEffect(() => {
    listenForStorageChanges("popup")
  }, [])
  return <Bears />
}

export default IndexPopup
