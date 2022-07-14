export const
  imm_wchost = el => el.getRootNode().host || null,
  imm_id = (el, id=`z${2e9*Math.random()|0}`) => el.id ||= id,

  imm_wcsel = (el, query) =>
    null === el ? null : query.nodeType ? query
    : el.closest?.(query) || imm_wcsel(imm_wchost(el), query),

  imm_set_qx = (key, el, query='*') => (
    imm_wcsel(el.parentNode, query)
      .dataset[key] = `${el.tagName}#${imm_id(el)}` ),

  imm_wcqx = (key, el_ctx) =>
    (el_ctx = imm_wcsel(el_ctx, `[data-${key}]`))
      .querySelector(el_ctx.dataset[key])

export {imm_wcqx as imm_qx}
