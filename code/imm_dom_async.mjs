import {imm, _imm_c} from './imm_dom_core.mjs'
export {imm, imm_set} from './imm_dom_core.mjs'

export const imma = (el_placeholder, el_promise, attrs) =>
  (_imma(el_placeholder, el_promise, attrs)
  , el_placeholder)

async function _imma(el_placeholder, el_promise, attrs) {
  el_promise = imm(_imm_c(await el_promise), attrs)
  el_placeholder.replaceWith(el_promise)
}
