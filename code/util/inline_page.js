import { _inline_all_done } from './_inline_util.js'
import { dom_as_html_src, mime_html, as_download } from './blob.js'
import { doc_inline_remove } from './inline_remove.js'
import { doc_inline_css } from './inline_css.js'
import { doc_inline_js } from './inline_js.js'

export const doc_inline_page = (el_root=window.document) => (
  el_root = doc_inline_meta(el_root),
  _inline_all_done(el_root,
      doc_inline_remove(el_root),
      doc_inline_css(el_root),
      doc_inline_js(el_root),
    ).then(dom_as_html_src))

export const doc_inline_page_download = (filename, el_root=window.document) => (
  filename ??= `inline-${el_root.location.pathname.split('/').pop()}`,
  as_download(filename, mime_html, doc_inline_page(el_root)) )

export const download_doc_inline_page = (filename, el_root=window.document) =>
  doc_inline_page_download(filename, el_root)
    .then(el => (el.click(), el))


export function doc_inline_meta(el_root) {
  for (let el_meta of el_root.querySelectorAll(`meta[data-inline],meta[data-inline-remove]`)) {
    let cpy = {... el_meta.dataset}
    delete cpy.inline_sel

    let sel = el_meta.dataset.inline_sel
    for (let el of sel ? el_root.querySelectorAll(sel) : [el_meta.nextElementSibling])
      Object.assign(el.dataset, cpy)

    el_meta.remove()
  }

  return el_root
}

