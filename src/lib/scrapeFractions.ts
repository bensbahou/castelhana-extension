import { fields } from "~types/project"
import type { FractionData } from "~types/project"

export const scrapeFractions = async (maxAttempts = 30) => {
  let table = null
  let attempts = 0
  while (!table && attempts < maxAttempts) {
    console.log("waiting for table")
    table = document.querySelector("table.factionsTable")
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  const tableBody = table.querySelector("tbody")
  const tableRows = tableBody.querySelectorAll("tr")

  const fractions: FractionData[] = []
  // Process each row to extract data
  tableRows.forEach((row) => {
    const rowData = {} as FractionData
    fields.forEach((field) => {
      rowData[field] = row
        .querySelector(`td.infoValue.${field}`)
        .textContent.trim()
    })

    // Do something with the extracted data
    fractions.push(rowData)
  })

  return fractions.map((fraction) => ({
    Ref: fraction.ref,
    Piso: fraction.piso,
    Fraçao: fraction.fraccao,
    Tipologia: fraction.typ,
    AreaPrivativa: fraction.area,
    AreaExterior: fraction.areaT,
    AreaTotal: fraction.areaB,
    Estacionamento: fraction.park,
    AreaInterior: fraction.areaT,
    AreaBruta: fraction.areaB,
    Price: fraction.price
  }))
}
