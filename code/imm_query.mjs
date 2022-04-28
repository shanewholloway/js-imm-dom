export const imm_qx = (key, el_ctx) =>
  (el_ctx = el_ctx.closest(`[data-${key}]`)) &&
    el_ctx.querySelector(el_ctx.dataset[key])

export const imm_wchost = el => el.getRootNode().host

export const imm_wcqx = (key, el_ctx) => !el_ctx ? null :
  imm_qx(key, el_ctx) || imm_wcqx(key, imm_wchost(el_ctx))

export function imm_set_qx(key, el, el_ctx=el.parentNode) {
  let id = el.id || (el.id = `z${2e9*Math.random()|0}`)
  el_ctx.dataset[key] = `${el.tagName}#${id}`
}

