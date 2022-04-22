import {imm_raf} from './imm_raf.mjs'
import {ImmElem} from './imm_elem_core.mjs'

export const ImmRAF = /* #__PURE__ */
  with_imm_raf(ImmElem)

export function with_imm_raf(ImmKlass) {
  if (ImmKlass[imm_raf.sym])
    throw new Error()

  return class extends ImmKlass {
    // re-schedule element for next animation frame
    raf(tgt) { return imm_raf(tgt || this) }

    // auto schedule an update on next animation frame (initial render, attribute changed)
    _render_(is_new) { imm_raf(this, is_new) }

    // then render on next animation frame
    [imm_raf.sym](_, is_new) { super._render_(is_new) }
  }
}

