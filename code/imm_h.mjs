import { imm_tag } from './imm_dom.mjs'
import { _imm_h, _htag } from './imm_htag.mjs'
export { imm_tag } from './imm_dom.mjs'
export { _htag } from './imm_htag.mjs'

const imm_h = h_lst => _imm_h(_htag(imm_tag), h_lst)

export { imm_h, imm_h as default }

