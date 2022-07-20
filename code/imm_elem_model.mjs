import { ImmCore } from './imm_elem_core.mjs'

export const ImmNS = /* #__PURE__ */
  ImmCore._wc_({
      c: o => o.update?.(o._ns_, o), // -- connectedCallback()
    }, z => ({update:z}))

/*
export class ImmNS
  extends #__PURE__
    ImmCore._wc_(_nsdd, , z => ({update:z}))
{
  // update(ns, el) {}
  static _zuse(z) { return {update: z} }
}
*/

export default ImmNS
