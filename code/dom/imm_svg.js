import { imm, _imm_tag_ } from './imm_dom_core.js'
export * from './imm_dom_core.js'

export const _imm_svg_ = {
  __proto__: _imm_tag_,
  $use($doc) { return {__proto__: _imm_svg_, $doc} },

  _imm_: (imm, tag, doc) =>
    (...args) =>
      imm(doc.createElementNS('http://www.w3.org/2000/svg',tag),...args),
}
export const imm_svg = { __proto__: _imm_svg_ }

export {
  imm_svg as svg,
  imm_svg as default,
}

