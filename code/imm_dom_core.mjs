import {_dash_name, _is_attr_dict, _el_get, _el_has, _el_set, _el_rm, _elr_evt} from './imm_utils.mjs'


// complex expression to avoid 'if', 'else', and 'return' keywords
export const _imm_aop = (el,[k,v],n,attrs,k0) => (
  k0 = k[0]
  , (
    ('$' === k0) // children to prepend
      ? (attrs.z ||= []).push(v)

    : ('=' === k0) // direct property assignment
      ? _imm_cp(el, v, k.split('=')[1])

    : ('@' === k0) // hook callback
      ? v(el, k)

    : 'function' === typeof v // event handlers
      ? _elr_evt(el, [k, v, v.opt])

    : ( // attribute values
      n = _dash_name(k),
      null == v || false === v
        ? _el_rm(el, n)
        : _el_set(el, n, true !== v ? v : ''))
  ), el)


export const imm_set = (el, ...args) => (
  el.textContent = '' // clear all inner content (text and html)
  , imm(el, ...args))

export function imm(el, ...args) {
  let len=args.length, attrs=args[0]

  if (0 < len && el?.nodeType) {
    if (_is_attr_dict(attrs)) {
      // replace attrs with null in args
      1 === len ? args = null : args[0] = null

      attrs = Object.entries(attrs)
      attrs.reduce(_imm_aop, el)

      // prepend children found in attrs.z
      attrs.z && el.prepend(... _imm_b(attrs.z))
    }

    // append arguments as children
    args && el.append(... _imm_b(args))
  }
  return el
}

export const _imm_c = c => (
  c &&= c && (c.toDOM || c.valueOf).call(c, c),
  c && (c.nodeType ? c : `${c}`) )

export const _imm_b = children =>
  [... children].flat(9).map(_imm_c).filter(Boolean)

export const _imm_cp = (tgt, src, key) =>
  Object.assign(tgt, key ? {[key]:src} : src)
