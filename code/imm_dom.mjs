import {imm_dom} from './imm_dom_core.mjs'

export {imm, imm_set, imm_emit} from './imm_dom_core.mjs'

export const imm_tag = imm_dom(document)
export const imm_svg_tag = imm_dom(document, 'http://www.w3.org/2000/svg')
export {
  imm_tag as default,
  imm_tag as tag,
  imm_svg_tag as tsvg,
}

