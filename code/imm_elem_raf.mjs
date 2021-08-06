import {imm_raf} from './imm_raf.mjs'
import {ImmElem} from './imm_elem_core.mjs'
import {_imm_attr_spy} from './imm_elem_auto.mjs'

export class ImmRAF extends ImmElem {
  // re-schedule element for next animation frame
  raf(tgt) { return imm_raf(tgt || this) }

  // auto schedule an update on next animation frame (initial render, attribute changed)
  _render_() { imm_raf(this) }

  // then render on next animation frame
  [imm_raf.sym]() { super._render_() }
}

export class ImmAutoRAF extends ImmRAF {
  static _imm_cfn(proto, fn_v) {
    super._imm_cfn(proto, fn_v)
    return _imm_attr_spy(this, proto.render)
  }
}

export default ImmAutoRAF
