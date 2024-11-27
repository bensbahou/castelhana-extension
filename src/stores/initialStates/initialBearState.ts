import type { BearValues } from "~types/bears"

export const initialBearState = {
  bears: 0,
  bigBears: 0
} as const satisfies BearValues
