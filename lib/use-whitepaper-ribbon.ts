"use client"

import { useEffect, useState } from "react"

const DISMISSED_KEY = "cw_ribbon_dismissed"
const DISMISS_EVENT = "cw:ribbon-dismissed"

export function dismissWhitepaperRibbon() {
  window.localStorage.setItem(DISMISSED_KEY, "1")
  window.dispatchEvent(new Event(DISMISS_EVENT))
}

export function useWhitepaperRibbonVisible(active: boolean): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return
    }

    const update = () => {
      setVisible(window.localStorage.getItem(DISMISSED_KEY) !== "1")
    }

    update()
    window.addEventListener(DISMISS_EVENT, update)
    window.addEventListener("storage", update)
    return () => {
      window.removeEventListener(DISMISS_EVENT, update)
      window.removeEventListener("storage", update)
    }
  }, [active])

  return visible
}
