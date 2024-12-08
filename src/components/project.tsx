import React, { useState } from "react"

import type { CleanProject } from "~types/project"

type Props = {
  project: CleanProject
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="relative">
      <div>
        Name of project : <span className="text-blue-500">{project.Name}</span>
      </div>
      <div>
        Name of broker : <span className="text-blue-500">Castelhana</span>
      </div>
      <div>
        Distrito : <span className="text-blue-500">{project.District}</span>
      </div>
      <div>
        Concelho : <span className="text-blue-500">{project.Municipality}</span>
      </div>
      <div>
        Freguesia : <span className="text-blue-500">{project.Parish}</span>
      </div>
      <div>
        Zona : <span className="text-blue-500">{project.Zone}</span>
      </div>
      <div>
        Estado : <span className="text-blue-500">{project.Status}</span>
      </div>
      <div>
        Referência : <span className="text-blue-500">{project.Referencia}</span>
      </div>
      <div>fractions length: {project.fractions.length}</div>
      <div>
        Project website link :{" "}
        <a className="text-blue-500" href={project.Link} target="_blank">
          {project.Link}
        </a>
      </div>
      <div>
        DateOfExtraction :{" "}
        <span className="text-blue-500">{project.DateOfExtraction}</span>
      </div>
      {/* <div>
        Infraestruturas:{" "}
        {JSON.stringify(project.Infraestruturas).slice(0, 100) + "..."}
      </div> */}
    </div>
  )
}

export default ProjectCard
