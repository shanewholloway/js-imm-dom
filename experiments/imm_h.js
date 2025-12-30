import { imm_tag } from './imm_dom.js'
import { _imm_h, _htag } from './imm_htag.js'
export { imm_tag } from './imm_dom.js'
export { _htag } from './imm_htag.js'

const imm_h = h_lst => _imm_h(_htag(imm_tag), h_lst)

export { imm_h, imm_h as default }

