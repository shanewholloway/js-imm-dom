import {imm_raf} from './imm_raf.js'
import {ImmElem} from './imm_elem.js'

export const ImmRAF = /* #__PURE__ */
  with_imm_raf(ImmElem)

export function with_imm_raf(ImmKlass) {
  if (ImmKlass[imm_raf.sym])
    throw new Error()

  return class extends ImmKlass {
    // re-schedule element for next animation frame
    raf(tgt) { return imm_raf(tgt || this) }

    // auto schedule an update on next animation frame (initial render, attribute changed)
    _render_(is_reconnect) { imm_raf(this, is_reconnect) }

    // then render on next animation frame
    [imm_raf.sym](_, is_reconnect) { super._render_(is_reconnect) }
  }
}

