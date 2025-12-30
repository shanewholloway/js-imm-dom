import { _el_on, _el_off } from './dom/imm_dom_utils.js'

const _opt_bc = {bubbles: true, cancelable: true}
export const imm_emit0 = (tgt, evt, opt) =>
  tgt.dispatchEvent(new CustomEvent(evt, opt))
export const imm_emit_at = (tgt, evt, detail, opt) =>
  imm_emit0(tgt, evt, {...opt, detail})
export const imm_emit = (tgt, evt, detail, opt) =>
  imm_emit0(tgt, evt, {..._opt_bc, ...opt, detail})
export const imm_wcemit = (tgt, evt, detail, opt) =>
  imm_emit0(tgt, evt, {composed: true, ..._opt_bc, ...opt, detail})

export const imm_once = (el, evt, opt) =>
  new Promise(fn => _el_on(el, evt, fn, {... opt, once: true}))

