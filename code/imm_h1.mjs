import { imm_tag } from './imm_dom.mjs'
import { _imm_h } from './imm_htag.mjs'
export { imm_tag } from './imm_dom.mjs'

const imm_h1 = h_lst => _imm_h(imm_tag, h_lst)

export { imm_h1, imm_h1 as default }
