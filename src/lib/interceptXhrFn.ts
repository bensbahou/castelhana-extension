export function interceptXhr(
  handleXhrLoad: (this: XMLHttpRequest, args: [string, ...any[]]) => void
) {
  console.log("Injected script running")

  const originalOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (
    this: XMLHttpRequest,
    ...args: [
      method: string,
      url: string,
      async?: boolean,
      username?: string | null,
      password?: string | null
    ]
  ) {
    // Original load listener for response
    this.addEventListener("load", function () {
      handleXhrLoad.call(this, args)
    })

    return originalOpen.apply(this, args)
  }
}
