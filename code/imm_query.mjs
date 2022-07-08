export const imm_wchost = el => el.getRootNode().host || null

export const imm_id = (el, id=`z${2e9*Math.random()|0}`) =>
  el.id ||= id

export const imm_set_qx = (key, el, el_ctx=el.parentNode) =>
  el_ctx.dataset[key] = `${el.tagName}#${imm_id(el)}`

export const imm_qx = (key, el_ctx) =>
  (el_ctx = el_ctx.closest(`[data-${key}]`)) &&
    el_ctx.querySelector(el_ctx.dataset[key])

export const imm_wcqx = (key, el_ctx) => null === el_ctx ? null :
  imm_qx(key, el_ctx) || imm_wcqx(key, imm_wchost(el_ctx))

