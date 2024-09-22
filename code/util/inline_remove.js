import { _qs_by_attr } from './_inline_util.js'

/* #__PURE__ */
const _inline_remove_ops = {
  $true: el => el.remove(),
  $all: el => el.remove(),

  $inner: el => el.textContent = '',

  $class: (el, key) =>
    key ? el.classList.remove(key)
        : el.removeAttribute('class'),

  $attr: (el, key) =>
    key && el.removeAttribute(key),
}

export async function doc_inline_remove(el_root=window.document) {
  for (let el of el_root.querySelectorAll('script[data-livereload]'))
    el.remove()

  for (let [el, cmd_list] of _qs_by_attr(el_root, '', 'data-inline-remove')) {
    cmd_list = (cmd_list || 'true').split(/\s+/)
    for (let cmd of cmd_list) {
      cmd = cmd.split(/[:=]/, 2)
      _inline_remove_ops['$'+cmd[0]]?.(el, cmd[1])
    }
  }
}
