import { Imm0 } from './imm_elem_core.js'

// #__NO_SIDE_EFFECTS__
export const
  _imm_clone = el => (el.content || el).cloneNode(true)

export const ImmClone =
  Imm0._wc_({c: el => imm_clone(el, el.getAttribute('query')) })

// #__NO_SIDE_EFFECTS__
export const imm_clone = (el_tgt, query, el_root=el_tgt.ownerDocument) =>
  (el_tgt.append(... Array.from(el_root.querySelectorAll(query), _imm_clone)),
   el_tgt)

