import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

export default function DropZone({text, onChoose = () => {}, file, extensions = [], accept}) {
  const [error, setError] = useState("")

  const onDrop = useCallback(acceptedFiles => {
    if(!acceptedFiles.length ||
      (extensions.length && !extensions.some(ext => acceptedFiles[0].name.endsWith(ext)))) {
      setError("Invalid file type")
      return
    }
    setError("")
    onChoose(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, useFsAccessApi: false, accept: accept})

  const msg = text || "Drag 'n' drop a file here, or click to select a file"

  return (
    <div {...getRootProps({className: 'drop-zone'})}>
      <input {...getInputProps()} />
      {
        file && (
          <p>Selected: <span>{file.name}</span></p>
        )
      }
      {error && <p className="error">{error}</p>}
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <p>{msg}</p>
      }
    </div>
  )
}
