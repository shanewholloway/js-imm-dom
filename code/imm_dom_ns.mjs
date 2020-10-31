import {imm_svg_tag, imm_tag} from './imm_dom.mjs'
import {imm_pxy} from './imm_pxy.mjs'

export const imm_html = imm_pxy(imm_tag)
export const imm_svg = imm_pxy(imm_svg_tag)

export {
  imm_html as default,
  imm_html as html,
  imm_svg as svg,
}
