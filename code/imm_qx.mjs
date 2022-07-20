import { with_emit0 } from './imm_evt_core.mjs'
import { ImmNS } from './imm_elem_model.mjs'
import { imm_set_qx } from './imm_query.mjs'
export { imm_set_qx, imm_qx, imm_wcqx } from './imm_query.mjs'

export class ImmQX extends /* #__PURE__ */ with_emit0(ImmNS) {
  update() { this.set_qx() }
  set_qx(key=this.qx, query=this.qx_on) {
    imm_set_qx(key, this, query)
  }
}

