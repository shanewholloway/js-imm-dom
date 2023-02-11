import {imm} from './imm_dom_core.js'
export {imm, imm_set} from './imm_dom_core.js'

export const imma = (el_placeholder, el_promise, attrs) =>
  (_imma(el_placeholder, el_promise, attrs)
  , el_placeholder)

async function _imma(el_placeholder, el_promise, attrs) {
  el_promise = imm(await el_promise, await attrs)
  el_placeholder?.replaceWith(el_promise)
}
