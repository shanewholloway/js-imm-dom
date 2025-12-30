import { imm } from './dom/imm_dom_core.js'
import { imm_tmpl_link } from './imm_tmpl_core.js'

export const imm_tmpl = /* #__PURE__ */
  imm_tmpl_link((el_tgt, is_replace, arg) => {
    if (is_replace) {
      // replace element entirely
      let el_new = arg?.call
        ? arg(el_tgt, is_replace, imm)
        : arg || ''

      if (el_tgt !== el_new && null != el_new)
        el_tgt.replaceWith(
          imm_flat(el_new, el_tgt))

    } else {
      // in-place element update

      if (arg.call) {
        // delegate to function
        arg(el_tgt, false, imm)
      } else {
        // update the node's attributes
        imm(el_tgt, arg)
      }
    }
  })

export default imm_tmpl

// #__NO_SIDE_EFFECTS__
export const imm_tmpl_f = (...args) =>
  imm_tmpl(...args).firstElementChild

// #__NO_SIDE_EFFECTS__
export const imm_tmpl_l = (...args) =>
  imm_tmpl(...args).lastElementChild

// #__NO_SIDE_EFFECTS__
export function imm_flat(tgt, host) {
  if (tgt == null || tgt.nodeType || tgt.trim)
    return tgt

  let fragment = (host.ownerDocument || host).createDocumentFragment()
  fragment.append(... tgt)
  return fragment
}


