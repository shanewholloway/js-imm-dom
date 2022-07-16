import { imm_tag } from './imm_dom.mjs'
import { imm_pxy_tag } from './imm_pxy.mjs'

export { imm, imm_set } from './imm_dom_core.mjs'

export const imm_html = /* #__PURE__ */ imm_pxy_tag(imm_tag)

export { imm_html as html, imm_html as default }
