import { _I_ } from './imm_utils.mjs'
import {imm, imm_set} from './imm_dom_core.mjs'
export {imm, imm_set} from './imm_dom_core.mjs'


export function imm_dom(host, tagns) {
  tagns = {
    $: 'html', html: 'http://www.w3.org/1999/xhtml',
    svg: 'http://www.w3.org/2000/svg',
    ... tagns }
  let
    _tag0 = (tag, ns) => (
      // split xml-tag like namespace prefix
      ((ns = tag.split(':'))[1] // if tuple is present
        ? [ns, tag]=ns // use namespace by prefix
        : ns=0 )  // otherwise use default namespace (falsy)
      , host.createElementNS( tagns[ns || tagns.$], tag )),

    tag_fn = (tag, ...args) =>
      imm(tag.nodeType ? tag : _tag0(tag), ...args)

  tag_fn.fragment = (...args) =>
    imm(host.createDocumentFragment(), null, ...args)

  tag_fn.text = text =>
    host.createTextNode(text)

  return tag_fn.tag = tag_fn
}

export const
  imm_otag = (el, tag, ...args) =>
    imm(el.ownerDocument.createElement(tag), ...args),

  imm_tag = /* #__PURE__ */
    _I_(imm_dom(document))

export {
  imm_tag as default,
  imm_tag as tag,
}

