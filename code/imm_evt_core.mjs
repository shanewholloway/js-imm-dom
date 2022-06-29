import { _elr_devt } from './imm_utils.mjs'

export function imm_emit0(tgt, evt, opt) {
  return tgt.dispatchEvent(new CustomEvent(evt, opt)) }

export function imm_emit_at(tgt, evt, detail, opt) {
  return imm_emit0(tgt, evt, {...opt, detail}) }

export function imm_emit(tgt, evt, detail, opt) {
  return imm_emit0(tgt, evt, {bubbles: true, cancelable: true, ...opt, detail}) }

export function imm_wcemit(tgt, evt, detail, opt) {
  return imm_emit(tgt, evt, detail, {composed: true, ...opt}) }


export const with_emit0 = ImmKlass =>
  class extends ImmKlass {
    emit0(evt, detail) {
      return imm_emit0(this, evt, {detail})
    }
    on(ns, fn) {
      return fn ? _elr_devt(this, [ns, fn])
        : Object.entries(ns).reduce(_elr_devt, this)
    }
  }

