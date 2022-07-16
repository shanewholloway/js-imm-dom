import { ImmCore } from './imm_elem_core.mjs'

let _nsdd = /* #__PURE__ */ { // ImmElem web component double dispatch
  c: o => o.update?.(o._ns_, o), // -- connectedCallback()
}

export const ImmNS = /* #__PURE__ */
  ImmCore._wc_(_nsdd, z => ({update:z}))

/*
export class ImmNS
  extends ImmCore._wc_(_nsdd, , z => ({update:z}))
{
  // update(ns, el) {}
  static _zuse(z) { return {update: z} }
}
*/

export default ImmNS
