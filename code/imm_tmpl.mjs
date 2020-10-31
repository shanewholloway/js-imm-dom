import { imm } from './imm_dom_core.mjs'
import { imm_tmpl_link } from './imm_tmpl_core.mjs'

function _invoke_arg(el_tgt, is_replace, arg) {
  if ('function' === typeof arg) {
    // delegate to function
    let el_new = arg(el_tgt, is_replace, imm)
    if (is_replace && el_tgt !== el_new && null != el_new)
      el_tgt.replaceWith(el_new)

  } else if (is_replace) {
    // replace the tagged node
    el_tgt.replaceWith(arg || '')

  } else {
    // update the node's attributes
    imm(el_tgt, arg)
  }
}

const imm_tmpl = imm_tmpl_link(_invoke_arg)
export {imm_tmpl, imm_tmpl as default}

