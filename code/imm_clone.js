import { Imm0 } from './imm_elem_core.js'
import { immq } from './imm_query.js'
export { immq } from './imm_query.js'

export const
  _imm_clone = el => (el.content || el).cloneNode(true)

export const ImmClone = /* #__PURE__ */
  Imm0._wc_({c: el => imm_clone(el, el.getAttribute('query')) })

export const imm_clone = (el_tgt, query, el_root=el_tgt.ownerDocument) =>
  (el_tgt.append(... Array.from(immq(query, el_root), _imm_clone)),
   el_tgt)

