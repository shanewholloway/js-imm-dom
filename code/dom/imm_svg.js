import { imm_dom, imm_pxy_tag } from './imm_dom.js'
export * from './imm_dom_core.js'

export const imm_svg_tag = /* #__PURE__ */
  imm_dom(document,
    tag => document.createElementNS('http://www.w3.org/2000/svg', tag))

export const imm_svg = /* #__PURE__ */
  imm_pxy_tag(imm_svg_tag)


export {
  imm_svg_tag as tsvg,
  imm_svg as svg,
  imm_svg as default,
}

