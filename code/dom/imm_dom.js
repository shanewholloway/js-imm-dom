import {_dash_name} from './imm_dom_utils.js'
import {imm} from './imm_dom_core.js'
export * from './imm_dom_core.js'

// #__NO_SIDE_EFFECTS__
export function imm_dom(docHost, tag0) {
  tag0 ??= tag => docHost.createElement(tag)
  let tag_fn = (tag, ...args) =>
    imm(tag.nodeType ? tag : tag0(tag), ...args)

  tag_fn.fragment = (...args) =>
    imm(docHost.createDocumentFragment(), null, ...args)

  tag_fn.text = text => docHost.createTextNode(text)
  return tag_fn.tag = tag_fn
}

const _imm_pxy_tag = {
  get(tag_fn, key, ns) {
    let r = tag_fn[key]
    if (undefined === r && /[a-zA-Z_-]/.test(key))
      ns[key] = r = tag_fn.bind(null, _dash_name(key))
    return r }}

// #__NO_SIDE_EFFECTS__
export const imm_pxy_tag = (tag_fn, kw=tag_fn) =>
  ({ __proto__: new Proxy(tag_fn, _imm_pxy_tag), ... kw })


export const imm_tag = /* #__PURE__ */
  imm_dom(document)

export const imm_html = /* #__PURE__ */
  imm_pxy_tag(imm_tag)

//
// #__NO_SIDE_EFFECTS__
export function imma(el_spot, el_promise, attrs) {
  el_spot ??= imm_tag('div')
  el_spot.ready = Promise.resolve(el_promise)
    .then(el_ready => el_spot.replaceWith(imm(el_ready, attrs)))
  return el_spot
}

// #__NO_SIDE_EFFECTS__
export const imm_parse = src =>
  new DOMParser().parseFromString('<!DOCTYPE html>'+src, 'text/html')


export {
  imm_tag as tag,
  imm_html as html,
  imm_html as h,
}

