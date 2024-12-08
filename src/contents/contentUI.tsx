import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import ReactJson from "react-json-view"

import { sendToBackground } from "@plasmohq/messaging"

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
import { clickNextButton } from "~lib/clickNextButton"
import { downloadProjectsData } from "~lib/downloadProjectsData"
import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { scrapeFractions } from "~lib/scrapeFractions"
import { useProjectsDataStore } from "~stores/useProjectsDataStore"

import "~style.css"

import type { CleanProject } from "~types/project"

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
  const [isRunning, setIsRunning] = useState(false)
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
    //console.log("projects", projects)
  }, [projects])
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (projectId) {
      scrapeFractions().then(({ fractions, Infraestruturas }) => {
        updateProject({
          ...project,
          fractions,
          Infraestruturas
        })
      })
    }
  }, [projectId])
  //console.log("project", project)
  const [projectBeingScraped, setProjectBeingScraped] =
    useState<CleanProject | null>(null)
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isRunning && TotalRecords <= projects.length) {
      intervalId = setInterval(() => {
        setProjectBeingScraped((currentProjectBeingScraped) => {
          const projectToComplete = projects.find(
            (project) =>
              !project.fractions.length &&
              project.ID !== currentProjectBeingScraped?.ID
          )

          if (!projectToComplete) {
            setIsRunning(false)
            clearInterval(intervalId)
            return currentProjectBeingScraped
          }

          sendToBackground({
            name: "completeScrape",
            body: projectToComplete
          })

          return projectToComplete
        })
      }, 8000)
    } else if (isRunning) {
      intervalId = setInterval(() => {
        clickNextButton()
      }, 5000)
    } else {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, TotalRecords, projects])

  return (
    open && (
      <Card className="fixed top-0 right-4 w-[500px] z-50">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Total Projects
            <span className="text-sm text-gray-500">
              {projects.length} / {TotalRecords}
            </span>
          </CardTitle>
          <CardDescription>
            Completed with fractions :{" "}
            {projects.filter((project) => project.fractions.length).length} /{" "}
            {TotalRecords}
          </CardDescription>
          currently Scrapping:{" "}
          {projectBeingScraped ? projectBeingScraped.Name : "none"}
        </CardHeader>
        <CardContent>
          {projectId && "Current Project : " + projectId}
          {project && projectId && <ProjectCard project={project} />}
          {project && projectId && !!project.fractions.length && (
            <FractionCard fraction={project.fractions[0]} />
          )}
          {false && <ReactJson src={project} />}
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          {!projectId && (
            <>
              <Button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Stop" : "Start"}
              </Button>
              <Button onClick={() => downloadProjectsData()}>Download</Button>
              <Button
                variant="destructive"
                onClick={() => {
                  useProjectsDataStore.getState().reset()
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                }}>
                Reset
              </Button>
            </>
          )}
          <Button onClick={() => setOpen(false)} variant="destructive">
            Close
          </Button>
        </CardFooter>
      </Card>
    )
  )
}

export default PlasmoOverlay
