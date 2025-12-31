import { imm, _imm_tag_ } from './imm_dom_core.js'
export * from './imm_dom_core.js'


export const _imm_html_ = {
  __proto__: _imm_tag_,
  $use($doc) { return {__proto__: _imm_html_, $doc} },

  _imm_: (imm, tag, doc) =>
    (...args) =>
      imm(doc.createElement(tag),...args),
}
export const imm_html = { __proto__: _imm_html_ }
export {
  imm_html as html,
  imm_html as h,
}


export function imma(el_spot, el_promise, attrs) {
  el_spot ??= imm_html.div()
  el_spot.ready = Promise.resolve(el_promise)
    .then(el_ready => el_spot.replaceWith(imm(el_ready, attrs)))
  return el_spot
}

export const imm_parse = src =>
  new DOMParser().parseFromString('<!DOCTYPE html>'+src, 'text/html')

