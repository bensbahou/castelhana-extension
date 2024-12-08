import type { CsvColumn, FractionsColumns } from "~types/project"

export const BASE_URL = "https://www.castelhana.pt/empreendimento/"
export const csvHeaderList = [
  "Name",
  "Broker",
  "Link",
  "District",
  "Municipality",
  "Parish",
  "Zone",
  "Status",
  "Referencia",
  "DateOfExtraction",
  "Ref",
  "Piso",
  "Fraçao",
  "Tipologia",
  "AreaPrivativa",
  "AreaExterior",
  "AreaTotal",
  "Estacionamento",
  "Price",
  "DateOfExtraction",
  "Infraestruturas"
] as const satisfies (CsvColumn | FractionsColumns | "Infraestruturas")[]
