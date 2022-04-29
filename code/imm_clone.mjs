import { Imm1 } from './imm_elem_core.mjs'

export class ImmClone extends Imm1 {
  update() { imm_clone(this, this.getAttribute('query')) }
}

export function imm_clone(el_tgt, query, el_root=el_tgt.ownerDocument) {
  for (let el of el_root.querySelectorAll(query)) {
    el = (el.content || el).cloneNode(true)
    el_tgt.append(el)
  }
}
