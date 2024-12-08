import { csvHeaderList } from "~constants/config"
import { useProjectsDataStore } from "~stores/useProjectsDataStore"

export const downloadProjectsData = () => {
  const projects = useProjectsDataStore.getState().Developments
  const csvHeaders = csvHeaderList.join(",")
  const csvRows = [] as string[]

  projects.forEach((project) => {
    project.fractions.forEach((fraction) => {
      const row = csvHeaderList.map((header) => {
        const value =
          header === "Infraestruturas"
            ? JSON.stringify(project.Infraestruturas)
            : project[header] || fraction[header]
        // Wrap the value in quotes and escape any existing quotes
        return `"${String(value).replace(/"/g, '""')}"`
      })
      csvRows.push(row.join(","))
    })
  })

  const csvContent = [csvHeaders, ...csvRows].join("\n")
  // download as csv
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "projects.csv"
  a.click()
}
