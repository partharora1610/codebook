import { useEffect, useRef, useState } from "react"

interface PreviewProps {
  code: string
  html: string
  error: string
}

const Preview: React.FC<PreviewProps> = ({ code, html, error }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!iframeRef.current) return

    const iframeLoadHandler = () => {
      setIframeLoaded(true)
    }

    iframeRef.current.addEventListener("load", iframeLoadHandler)

    return () => {
      iframeRef.current?.removeEventListener("load", iframeLoadHandler)
    }
  }, [])

  useEffect(() => {
    if (iframeLoaded && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(code, "*")
    }
  }, [code, iframeLoaded])

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html
    }
  }, [html])

  return (
    <>
      <iframe
        className="bg-white w-full h-full"
        title="Preview"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
      ></iframe>

      {error ? <div className="text-red-500 bg-white">{error}</div> : ""}
    </>
  )
}

export default Preview
