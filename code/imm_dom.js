import {imm, imm_set} from './imm_dom_core.js'
export * from './imm_dom_core.js'


export function imm_dom(host, tag0) {
  tag0 ??= tag => host.createElement(tag)
  let tag_fn = (tag, ...args) =>
    imm(tag.nodeType ? tag : tag0(tag), ...args)

  tag_fn.fragment = (...args) =>
    imm(host.createDocumentFragment(), null, ...args)

  tag_fn.text = text => host.createTextNode(text)
  return tag_fn.tag = tag_fn
}

export const
  imm_otag = (el, tag, ...args) =>
    imm(tag.nodeType ? tag : el.ownerDocument.createElement(tag), ...args),

  imm_tag = /* #__PURE__ */
    imm_dom(document)

export {
  imm_tag as default,
  imm_tag as tag,
}

