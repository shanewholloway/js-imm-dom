import { Imm0 } from './imm_elem_core.mjs'
import { imm_pxy_attr } from './imm_pxy.mjs'
import { imm_set_qx } from './imm_query.mjs'
export { imm_set_qx, imm_qx, imm_wcqx } from './imm_query.mjs'

export class ImmQX extends Imm0 {
  get _ns_() { return imm_pxy_attr(this) }
  connectedCallback() { this.set_qx() }
  set_qx(key=this.qx||this.tagName) {
    imm_set_qx(key, this, this.qx_parent)
  }
}

