import {ImmCore} from './imm_elem_core.mjs'

export class ImmClone extends ImmCore {
  connectedCallback() {
    imm_clone(this, this._ns_.query)
  }
}

export function imm_clone(el_tgt, query, el_root=el_tgt.ownerDocument) {
  for (let el of el_root.querySelectorAll(query || '[data-shadow]')) {
    el = (el.content || el).cloneNode(true)
    el_tgt.append(el)
  }
}

