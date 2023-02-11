import { imm_tag } from './imm_dom.js'
import { imm_pxy_tag } from './imm_pxy.js'

export { imm, imm_set } from './imm_dom_core.js'

export const imm_html = /* #__PURE__ */ imm_pxy_tag(imm_tag)

export { imm_html as html, imm_html as default }
