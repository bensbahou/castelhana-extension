import { useBearStore } from "~stores/useBearStore"

import { Button } from "./button"

const Bears = () => {
  const { bears, bigBears, reset, setBears } = useBearStore()
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <p>Extension: {chrome.runtime.getManifest().name}</p>
      <Button
        onClick={() =>
          setBears({
            bears: bears + 5
          })
        }>
        add 5 bears {bears} - {bigBears}
      </Button>
      <Button
        onClick={() =>
          setBears({
            bigBears: bigBears + 5
          })
        }>
        add 5 big bears {bears} - {bigBears}
      </Button>
      <Button onClick={() => reset()}>
        reset {bears} - {bigBears}
      </Button>
    </div>
  )
}

export default Bears
