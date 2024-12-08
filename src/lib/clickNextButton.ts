export const clickNextButton = () => {
  const nextButton = document.querySelector(
    "i.egoiconfont-arrow-thin-right"
  ) as HTMLElement
  console.log("nextButton", nextButton)
  nextButton.click()
}
