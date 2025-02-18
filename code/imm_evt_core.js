import { _el_on, _el_off } from './imm_utils.js'
  

export function imm_emit0(tgt, evt, opt) {
  return tgt.dispatchEvent(new CustomEvent(evt, opt)) }

export function imm_emit_at(tgt, evt, detail, opt) {
  return imm_emit0(tgt, evt, {...opt, detail}) }

export function imm_emit(tgt, evt, detail, opt) {
  return imm_emit0(tgt, evt, {bubbles: true, cancelable: true, ...opt, detail}) }

export function imm_wcemit(tgt, evt, detail, opt) {
  return imm_emit(tgt, evt, detail, {composed: true, ...opt}) }


export function _el_evt(_elfn, el, ns, opt) {
  for (let [evt, evt_fn] of Object.entries(ns))
    _el_on(el, evt, evt_fn, opt)
  return el
}

export const imm_on = (el, ns, opt) =>
  _el_evt(_el_on, el, ns, opt)

export const imm_off = (el, ns, opt) =>
  _el_evt(_el_off, el, ns, opt)

export const imm_evt = (el, ns, opt) => (
  el = _el_evt(_el_on, el, ns, opt),
  () => el &&= void _el_evt(_el_off, el, ns, opt))


export const with_emit0 = ImmKlass =>
  class extends ImmKlass {
    emit0(evt, detail) {
      return imm_emit0(this, evt, {detail})
    }
    on(... ns) {
      ns = ns[1] ? [ns] : ns[0]
      return imm_on(this, ns, f => e => f(e.detail))
    }
  }

