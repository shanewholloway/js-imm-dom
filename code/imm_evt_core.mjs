
export function imm_emit0(tgt, evt, opt) {
  return tgt.dispatchEvent(new CustomEvent(evt, opt)) }

export function imm_emit_at(tgt, evt, detail, opt) {
  return imm_emit0(tgt, evt, {...opt, detail}) }

export function imm_emit(tgt, evt, detail, opt) {
  return imm_emit0(tgt, evt, {bubbles: true, cancelable: true, ...opt, detail}) }

export function imm_wcemit(tgt, evt, detail, opt) {
  return imm_emit(tgt, evt, detail, {composed: true, ...opt}) }

