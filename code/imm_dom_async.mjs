import {imm, _imm_c} from './imm_dom_core.mjs'

export const imma = (el_placeholder, el_promise, attrs) =>
  (el_placeholder._p_ = _imma(el_placeholder, el_promise, attrs)
  , el_placeholder)

export const imma_fn = (el_fn, attrs) =>
  el_placeholder => imma(el_fn(), el_placeholder, attrs)

async function _imma(el_placeholder, el_promise, attrs) {
  el_placeholder.replaceWith(
    imm(_imm_c(await el_promise), attrs))
}
