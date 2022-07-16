import { _is_iter } from './imm_utils.mjs'
import { imm_tag } from './imm_dom.mjs'
import { imm_htag } from './imm_htag.mjs'

export const imm_h1 = /* #__PURE__ */
  imm_htag(imm_tag)

export { imm_tag, imm_h1 as default }
