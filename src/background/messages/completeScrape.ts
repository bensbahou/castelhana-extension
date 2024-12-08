import type { PlasmoMessaging } from "@plasmohq/messaging"

import { scrapeProject } from "~lib/completeScrape"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const projectToComplete = req.body
  //console.log("completeScrape", projectToComplete)
  await scrapeProject(projectToComplete)

  res.send({
    message: {
      message: "completeScrape",
      projectToComplete
    }
  })
}

export default handler
