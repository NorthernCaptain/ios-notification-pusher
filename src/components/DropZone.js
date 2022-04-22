import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function DropZone({text, onChoose = () => {}, file}) {
  const onDrop = useCallback(acceptedFiles => {
    onChoose(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, useFsAccessApi: false})

  const msg = text || "Drag 'n' drop a file here, or click to select a file"

  return (
    <div {...getRootProps({className: 'drop-zone'})}>
      <input {...getInputProps()} />
      {
        file && (
          <p>Selected: <span>{file.name}</span></p>
        )
      }
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <p>{msg}</p>
      }
    </div>
  )
}
