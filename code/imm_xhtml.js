import { imm_dom } from './imm_dom.js'
import { imm_pxy_tag } from './imm_pxy.js'
export { imm, imm_set } from './imm_dom_core.js'


export const imm_xhtml_tag = /* #__PURE__ */
  imm_dom(document,
    tag => document.createElementNS('http://www.w3.org/2000/svg', tag))

export const imm_xhtml = /* #__PURE__ */
  imm_pxy_tag(imm_xhtml_tag)


export {
  imm_xhtml as xhtml,
  imm_xhtml as default
}
