import { _inline_all_done } from './_inline_util.js'
import { dom_as_html_src, mime_html, as_download } from './blob.js'
import { doc_inline_remove } from './inline_remove.js'
import { doc_inline_css } from './inline_css.js'
import { doc_inline_js } from './inline_js.js'

export const doc_inline_page = (el_root=window.document) =>
  _inline_all_done(el_root,
      doc_inline_remove(el_root),
      doc_inline_css(el_root),
      doc_inline_js(el_root),
    ).then(dom_as_html_src)

export const doc_inline_page_download = (filename, el_root=window.document) => (
  filename ??= `inline-${el_root.location.pathname.split('/').pop()}`,
  as_download(filename, mime_html, doc_inline_page(el_root)) )

export const download_doc_inline_page = (filename, el_root=window.document) =>
  doc_inline_page_download(filename, el_root)
    .then(el => (el.click(), el))

