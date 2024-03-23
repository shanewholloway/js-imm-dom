export const mime_html = 'text/html'
export const mime_css = 'text/css'
export const mime_js = 'text/javascript'

export const as_blob = async (mimetype, ...args) =>
  new Blob(await Promise.all(args), {type: mimetype})

export const as_dataurl = async (mimetype, ...args) =>
  blob_as_dataurl( as_blob(mimetype, ...args) )

export const as_download = async (filename, mimetype, ...args) =>
  blob_as_download(filename, await as_blob(mimetype, ...args) )

export const blob_as_download = (filename, blob) =>
  _as_download_elem(filename, URL.createObjectURL(blob))

export const _as_download_elem = (filename, href) =>
  Object.assign(document.createElement('a'), { download: filename, href })

export async function blob_as_dataurl(blob) {
  blob = await blob
  let rdr = new FileReader()
  await new Promise((onload, onerror) => {
    rdr.onload = onload
    rdr.onerror = onerror
    rdr.readAsDataURL(blob)
  })
  return rdr.result
}

export const cssom_as_css_src = (cssom) =>
  Array.from(cssom.cssRules, rule => rule.cssText).join('\n')

export const dom_as_html_src = (dom) =>
  new XMLSerializer().serializeToString(dom)

