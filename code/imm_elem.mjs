import {ImmCoreElem} from './imm_elem_core.mjs'

export class ImmElem extends ImmCoreElem  {
  attributeChangedCallback() { this.render() }
  connectedCallback() { this.render() }
}

export default ImmElem
