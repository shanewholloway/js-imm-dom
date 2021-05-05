import { imm } from './imm_dom_core.mjs'
import { imm_tmpl_link } from './imm_tmpl_core.mjs'

const imm_tmpl = imm_tmpl_link((el_tgt, is_replace, arg) => {
  if (is_replace) {
    // replace element entirely
    let el_new = 'function' === typeof arg
      ? arg(el_tgt, is_replace, imm)
      : arg || ''

    if (el_tgt !== el_new && null != el_new)
      el_tgt.replaceWith(
        imm_flat(el_new, el_tgt))

  } else {
    // in-place element update

    if ('function' === typeof arg) {
      // delegate to function
      arg(el_tgt, false, imm)
    } else {
      // update the node's attributes
      imm(el_tgt, arg)
    }
  }
})

export function imm_flat(tgt, host) {
  if ('string' === typeof tgt || tgt == null || tgt.nodeType)
    return tgt

  let fragment = (host.ownerDocument || host).createDocumentFragment()
  for (let e of tgt)
    fragment.append(e)
  return fragment
}

export {imm_tmpl, imm_tmpl as default}

