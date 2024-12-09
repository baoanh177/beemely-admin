import { useEffect } from "react"

const useCleanup = (callback = () => {}, dependencies = []) => {
  useEffect(() => {
    return callback
  }, dependencies)
}

export default useCleanup