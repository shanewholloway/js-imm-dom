import {ImmElem, with_imm_observe} from '../imm_elem_core.mjs'

export function _imm_attr_spy(klass, fn_target) {
  // Proxy spy to find observed attributes
  let attrs = new Set()
  let spy = new Proxy({}, {get(t,n) { attrs.add(n) }})
  fn_target(spy)
  return with_imm_observe(klass, ... attrs)
}

export class ImmAuto extends ImmElem  {
  static _imm_cfn(proto, fn_v) {
    super._imm_cfn(proto, fn_v)
    return _imm_attr_spy(this, proto.render)
  }
}

export default ImmAuto