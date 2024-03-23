export async function _inline_all_done(el_root, ...q) {
  q = q.flat()
  while (0 < q.length)
    await q.pop()
  return el_root
}

export function * _qs_inline(el_root, selector, fn_inline_el) {
  for (let el of el_root.querySelectorAll(`${selector}[data-inline]`)) {
    delete el.dataset.inline
    yield fn_inline_el ? fn_inline_el(el) : el
  }
}

