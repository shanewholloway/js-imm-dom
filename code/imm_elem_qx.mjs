import { imm_set_qx } from './imm_query.mjs'
import { ImmCore } from './imm_elem_core.mjs'
export { imm_qx, imm_wchost, imm_wcqx, imm_set_qx } from './imm_query.mjs'

export class ImmQX extends ImmCore {
  connectedCallback() {
    let key = this.qx || this.tagName
    imm_set_qx(key, this, this.qx_parent)
  }
}
// ImmQX.with({qx:'myapi'}).define('wc-myapi')

