import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import ReactJson from "react-json-view"

import FractionCard from "~components/Fraction"
import ProjectCard from "~components/project"
import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { scrapeFractions } from "~lib/scrapeFractions"
import { useProjectsDataStore } from "~stores/useProjectsDataStore"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.castelhana.pt/empreendimento*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const {
    Developments: projects,
    TotalRecords,
    reset,
    setProjectsData,
    updateProject
  } = useProjectsDataStore()
  const projectId = window.location.href.startsWith(
    "https://www.castelhana.pt/empreendimento/"
  )
    ? window.location.href.split("/").pop()
    : null

  const project = projects.length
    ? projectId
      ? projects.find((project) => project.ID === Number(projectId)) ||
        projects[0]
      : projects[0]
    : null
  useEffect(() => {
    listenForStorageChanges("content")
  }, [])

  useEffect(() => {
    console.log("projects", projects)
  }, [projects])
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (projectId) {
      scrapeFractions().then((fractions) => {
        updateProject({
          ...project,
          fractions
        })
      })
    }
  }, [projectId])
  console.log("project", project)
  return (
    open && (
      <Card className="fixed top-0 right-4 w-[500px] z-50">
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
          <CardDescription>
            {projects.length} / {TotalRecords}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projectId ? "Current Project : " + projectId : "First Project :"}
          {project ? <ProjectCard project={project} /> : "No projects found"}
          {project && !!project.fractions.length && (
            <FractionCard fraction={project.fractions[0]} />
          )}
          {false && <ReactJson src={project} />}
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button onClick={() => useProjectsDataStore.getState().reset()}>
            Reset
          </Button>
          <Button onClick={() => setOpen(false)} variant="destructive">
            Close
          </Button>
        </CardFooter>
      </Card>
    )
  )
}

export default PlasmoOverlay
