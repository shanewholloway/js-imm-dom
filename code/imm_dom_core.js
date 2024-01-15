import {
  _dash_name,
  _is_attr_dict, _is_iter,
  _el_set, _el_on,
  _imm0, _imm_cp
} from './imm_utils.js'
export { _imm0, _imm_cp }


// complex expressions to avoid 'if', 'else', and 'return' keywords
const
  // .reduce(_imm_aop, el) interpretation of imm attribute dictionary semantics
  _imm_aop = (el,[k,v],k0,attrs) => (
      k0 = k[0]
      , (
        '$' === k0 // children to prepend
          ? (attrs.z ||= []).push(v)

        : '=' === k0 // direct property assignment
          ? _imm_cp(el, v, k.split('=')[1])

        : '@' === k0 // hook callback
          ? v.call ? v(el, k) : v[k.slice(1)||'append'](el)

        : 0 == k0 // use as target element from attrs
          ? el = v

        : v?.call // event handlers
          ? _el_on(el, k, v, v.opt)

        : _el_set(el, _dash_name(k), v) // attribute values
      ), el)



export function imm(el, ...args) {
  if (! el?.nodeType) args.unshift(el)
  let len=args.length, attrs=args[0]

  if (0 < len) {
    if (_is_attr_dict(attrs)) {
      // replace attrs with null in args
      1 === len ? args = null : args[0] = null

      attrs = Object.entries(attrs)
      el = attrs.reduce(_imm_aop, el)

      // prepend children found in attrs.z
      attrs.z && el.prepend(... _imm_b(attrs.z))
    }

    // append arguments as children
    args && el.append(... _imm_b(args))
  }
  return el
}


export const
  // clear all inner content (text and html)
  imm_set = (el, ...args) => imm(_imm0(el), ...args)


export function * _imm_b(iterable) {
  // Recursive interpretation of imm child elements.
  // Works with arrays, nodelists, and other iterables
  for (let c of iterable)
    if (null != c) {
      c = c.toDOM?.(c) ?? c.valueOf(c)

      if (_is_iter(c))
        yield * _imm_b(c)
      else
        yield c.nodeType ? c // pass-through nodes
            : ''+c // otherwise force toString()
    }
}

