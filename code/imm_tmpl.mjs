import { imm } from './imm_dom_core.mjs'
import { imm_tmpl_link } from './imm_tmpl_core.mjs'

function _invoke_arg(tgt, is_replace, arg) {
  if ('function' === typeof arg) {
    // delegate to function
    let el_new = arg(tgt, is_replace, imm)
    if (is_replace && null != el_new)
      tgt.replaceWith(el_new)

  } else if (is_replace) {
    // replace the tagged node
    tgt.replaceWith(arg || '')

  } else {
    // update the node's attributes
    imm(tgt, arg)
  }
}

const imm_tmpl = imm_tmpl_link(_invoke_arg)
export {imm_tmpl, imm_tmpl as default}

