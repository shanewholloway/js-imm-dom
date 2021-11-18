import {imm, imm_set} from './imm_dom_core.mjs'
export {imm, imm_set} from './imm_dom_core.mjs'


export function imm_dom(host, namespaceURI) {
  let _el_ = namespaceURI
    ? host.createElementNS.bind(host, namespaceURI)
    : host.createElement.bind(host)

  let tag_fn = (tag, ...args) =>
    imm(tag.nodeType ? tag : _el_(tag), ...args)

  tag_fn.fragment = (...args) =>
    imm(host.createDocumentFragment(), null, ...args)

  tag_fn.text = host.createTextNode.bind(host)
  return tag_fn.tag = tag_fn
}

export const imm_tag = /* #__PURE__ */ imm_dom(document)
export const imm_svg_tag = /* #__PURE__ */ imm_dom(document, 'http://www.w3.org/2000/svg')

export {
  imm_tag as default,
  imm_tag as tag,
  imm_svg_tag as tsvg,
}

