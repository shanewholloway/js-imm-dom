import { _qs_inline, _inline_all_done } from './_inline_util.js'
import { dom_as_html_src, mime_html, as_download } from './blob.js'
import { doc_inline_css } from './inline_css.js'
import { doc_inline_js } from './inline_js.js'


export async function doc_inline_page(el_root=window.document) {
  for (let el of el_root.querySelectorAll('[data-inline-remove]'))
    el.remove()

  await _inline_all_done(el_root,
    doc_inline_css(el_root),
    doc_inline_js(el_root))

  return dom_as_html_src(el_root)
}

export const doc_inline_page_download = (filename, el_root=window.document) =>
  as_download(
    filename ?? `inline-${el_root.location.pathname.split('/').pop()}`,
    mime_html, doc_inline_page(el_root))

