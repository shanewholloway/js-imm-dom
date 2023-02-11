import { imm_dom } from './imm_dom.js'
import { imm_pxy_tag } from './imm_pxy.js'

export { imm, imm_set } from './imm_dom_core.js'


export const imm_svg_tag = /* #__PURE__ */
  imm_dom(document, {$: 'svg'})

export const imm_svg = /* #__PURE__ */
  imm_pxy_tag(imm_svg_tag)


export {
  imm_svg_tag as tsvg,
  imm_svg as svg,
  imm_svg as default,
}

