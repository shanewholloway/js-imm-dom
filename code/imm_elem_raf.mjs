import {imm_raf} from './imm_raf.mjs'
import {ImmElem} from './imm_elem_core.mjs'
import {ImmIter} from './imm_elem_iter.mjs'

export const ImmRAF = /* #__PURE__ */
  with_imm_raf(ImmElem)

export const ImmIterRAF = /* #__PURE__ */
  with_imm_raf(ImmIter)

export function with_imm_raf(ImmKlass) {
  if (ImmKlass[imm_raf.sym])
    throw new Error()

  return class extends ImmKlass {
    // re-schedule element for next animation frame
    raf(tgt) { return imm_raf(tgt || this) }

    // auto schedule an update on next animation frame (initial render, attribute changed)
    _render_() { imm_raf(this) }

    // then render on next animation frame
    [imm_raf.sym]() { super._render_() }
  }
}

