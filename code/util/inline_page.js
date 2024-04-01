import { _qs_inline, _inline_all_done } from './_inline_util.js'
import { dom_as_html_src, mime_html, as_download } from './blob.js'
import { doc_inline_css } from './inline_css.js'
import { doc_inline_js } from './inline_js.js'

export function doc_inline_remove(el_root=window.document) {
  for (let el of el_root.querySelectorAll('[data-inline-remove]'))
    el.remove()
  return el_root
}

export const doc_inline_page = (el_root=window.document) =>
  _inline_all_done(el_root,
      doc_inline_remove(el_root),
      doc_inline_css(el_root),
      doc_inline_js(el_root),
    ).then(dom_as_html_src)

export const doc_inline_page_download = (filename, el_root=window.document) =>
  as_download(
    filename ?? `inline-${el_root.location.pathname.split('/').pop()}`,
    mime_html, doc_inline_page(el_root))

