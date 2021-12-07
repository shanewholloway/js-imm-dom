import {_dash_name, _is_attr_dict} from './imm_utils.mjs'

export function imm_set(el, ...args) {
  el.textContent = '' // clear all inner content (text and html)
  return imm(el, ...args)
}

export function imm(el, ...args) {
  let len = args.length
  if (0 === len)
    return el // fast-path -- no arguments

  let pre, attrs = args[0]
  if (_is_attr_dict(attrs)) {
    args[0] = null // replace attrs null
    for (let [k,v] of Object.entries(attrs)) {
      let k0 = k[0]
      if ('$' === k0) {
        // children to prepend
        pre = (pre || []).concat(v)
      } else if ('=' === k0) {
        // direct property assignment
        Object.assign(el, v)
      } else if ('@' === k0) {
        // hook callback
        v(el, k)
      } else if ('function' === typeof v) {
        // event handlers
        el.addEventListener(k, v, v.opt)
      } else {
        // attribute values
        let n = _dash_name(k)
        if (null == v || false === v)
          el.removeAttribute(n)
        else el.setAttribute(n, true !== v ? v : '')
      }
    }

    // prepend children found in attrs
    if (pre) el.prepend(... _imm_b(pre))

    if (1 === len)
      return el // fast path -- attrs with no additional children to append
  }

  // append arguments as children
  el.append(... _imm_b(args))
  return el
}

export function _imm_c(c) {
  c = c && (c.toDOM || c.valueOf).call(c, c)
  return c && (c.nodeType ? c : `${c}`)
}
export function _imm_b(children) {
  return children.flat(9).map(_imm_c).filter(Boolean)
}

