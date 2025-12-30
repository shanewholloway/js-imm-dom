import { imm_emit0 } from '../imm_evt_core.js'
import { ImmNS } from './imm_elem_model.js'
import { imm_set_qx } from './imm_qx_core.js'
export { imm_set_qx, imm_qx, imm_wcqx } from '../imm_qx_core.js'


// #__NO_SIDE_EFFECTS__

export class ImmQX extends ImmNS {
  update() { this.set_qx() }
  set_qx(key=this.qx, query=this.qx_on) {
    imm_set_qx(key, this, query)
  }
  emit0(evt, detail) {
    return imm_emit0(this, evt, {detail})
  }
  on(... ns) {
    ns = ns[1] ? [ns] : ns[0]
    return imm_on(this, ns, f => e => f(e.detail))
  }
}

