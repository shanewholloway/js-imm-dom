import {imm_raf} from './imm_raf.mjs'
import {ImmCoreElem} from './imm_elem_core.mjs'

export class ImmElemRAF extends ImmCoreElem {
  // schedule an update on next animation frame
  attributeChangedCallback() { imm_raf(this) }
  connectedCallback() { imm_raf(this) }

  // perform an update using attributes on this custom element
  [imm_raf.sym]() { this.render() }

  // re-schedule element for next animation frame
  raf(tgt) { return imm_raf(tgt || this) }
}

export default ImmElemRAF
