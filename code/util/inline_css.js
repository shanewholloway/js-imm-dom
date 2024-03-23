import { _qs_inline, _inline_all_done } from './_inline_util.js'
import { cssom_as_css_src, mime_css, as_dataurl } from './blob.js'


export const doc_inline_css = (el_root=window.document) =>
  _inline_all_done(el_root,
    ... _qs_inline(el_root, 'link[rel=stylesheet]', inline_stylesheet),
    ... _qs_inline(el_root, 'style', inline_style) )


export async function inline_stylesheet(el) {
  let css_src = cssom_as_css_src(el.sheet)
  let _dataurl = await as_dataurl(mime_css, css_src)
  el.href = _dataurl
  return el
}

export async function inline_style(el) {
  let css_src = cssom_as_css_src(el.sheet)
  el.textContent = css_src
  return el
}

