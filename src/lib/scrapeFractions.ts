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
  const featuresListDiv = document.querySelector("div.featuresList")
  const featuresListItems = featuresListDiv.querySelectorAll(
    "div.featuresListItem"
  )

  const features = {} as Record<string, string>
  featuresListItems.forEach((item) => {
    const featureHeader = item
      .querySelector("div.featureTitle")
      .textContent.trim()
    console.log("featureHeader", featureHeader)
    //replace multiple spaces with a single space
    const featureValue = item
      .querySelector("ul")
      .textContent.trim()
      .replace(/\s+/g, " ")
    console.log("featureValue", featureValue)
    features[featureHeader] = featureValue
  })

  console.log("features", features)

  return {
    fractions: fractions.map((fraction) => ({
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
    })),
    Infraestruturas: features
  }
}
