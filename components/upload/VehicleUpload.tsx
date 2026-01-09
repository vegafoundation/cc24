'use client'

import { useEffect } from 'react'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Tus from '@uppy/tus'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

interface VehicleUploadProps {
  onComplete?: (files: any[]) => void
  maxFiles?: number
}

export default function VehicleUpload({ onComplete, maxFiles = 36 }: VehicleUploadProps) {
  useEffect(() => {
    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: maxFiles,
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
        minFileSize: 100000, // 100KB
        maxFileSize: 25000000, // 25MB
      },
      autoProceed: false,
    })
      .use(Dashboard, {
        inline: true,
        target: '#uppy-dashboard',
        showProgressDetails: true,
        proudlyDisplayPoweredByUppy: false,
        note: `Bitte laden Sie zwischen 16 und ${maxFiles} Bilder für die 360°-Ansicht hoch.`,
        locale: {
          strings: {
            dropHereOr: 'Ziehen Sie Bilder hierher oder %{browse}',
            browse: 'durchsuchen',
            youCanOnlyUploadX: {
              0: 'Sie können nur %{smart_count} Datei hochladen',
              1: 'Sie können nur %{smart_count} Dateien hochladen',
            },
            youHaveToAtLeastSelectX: {
              0: 'Sie müssen mindestens %{smart_count} Datei auswählen',
              1: 'Sie müssen mindestens %{smart_count} Dateien auswählen',
            },
            exceedsSize: 'Diese Datei überschreitet die maximale Größe von %{size}',
            youCanOnlyUploadFileTypes: 'Sie können nur folgende Dateitypen hochladen: %{types}',
          },
        },
      })
      .use(Tus, {
        endpoint: '/api/upload',
        retryDelays: [0, 1000, 3000, 5000],
        chunkSize: 5 * 1024 * 1024, // 5MB
      })

    uppy.on('complete', (result) => {
      if (onComplete) {
        onComplete(result.successful)
      }
    })

    return () => {
      uppy.close()
    }
  }, [onComplete, maxFiles])

  return <div id="uppy-dashboard" />
}
