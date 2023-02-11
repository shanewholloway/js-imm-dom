import { imm_tag } from './imm_dom.js'
import { _imm_h } from './imm_htag.js'
export { imm_tag } from './imm_dom.js'

const imm_h1 = h_lst => _imm_h(imm_tag, h_lst)

export { imm_h1, imm_h1 as default }
