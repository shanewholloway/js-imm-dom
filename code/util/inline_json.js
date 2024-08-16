import { _as_download_elem } from './blob.js'

export const json_as_download = (opt, ...z) => (
  z = JSON.stringify(...args),
  _as_download_elem(opt || `download-${new Date().toISOString()}.json`,
    URL.createObjectURL(new Blob([z], {type: 'application/json'}))) )

