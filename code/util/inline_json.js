import { mime_json, _as_blob, _as_download_elem } from './blob.js'

export const json_as_blob = (...args) =>
  _as_blob(mime_json, JSON.stringify(...args))

export const json_as_download = (opt, ...args) =>
  _as_download_elem(opt || `download-${new Date().toISOString()}.json`,
    URL.createObjectURL(
      _as_blob(mime_json, JSON.stringify(...args)) ))

