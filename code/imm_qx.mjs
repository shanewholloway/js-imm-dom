import { with_emit0 } from './imm_evt_core.mjs'
import { ImmNS } from './imm_elem_core.mjs'
import { imm_set_qx } from './imm_query.mjs'
export { imm_set_qx, imm_qx, imm_wcqx } from './imm_query.mjs'

export class ImmQX extends with_emit0(ImmNS) {
  update() { if (this.isConnected) this.set_qx() }
  set_qx(key=this.qx) {
    imm_set_qx(key, this, this.qx_parent)
  }
}

