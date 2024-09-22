export async function _inline_all_done(el_root, ...q) {
  q = q.flat()
  while (0 < q.length)
    await q.pop()
  return el_root
}

export function * _qs_by_attr(el_root, selector, attr) {
  for (let el of el_root.querySelectorAll(`${selector}[${attr}]`)) {
    let arg = el.getAttribute(attr)
    el.removeAttribute(attr)
    yield [el, arg]
  }
}

export function * _qs_inline(el_root, selector, fn_inline_el) {
  for (let [el, arg] of _qs_by_attr(el_root, selector, 'data-inline'))
    yield fn_inline_el ? fn_inline_el(el) : el
}

