import {
  _dash_name,
  _is_attr_dict, _is_iter,
  _el_set, _el_on,
  _imm0, _imm_cp
} from './imm_utils.js'
export { _imm0, _imm_cp }


// complex expressions to avoid keywords like 'if', 'else', 'return', 'switch', 'case', 'default'.
const
  // .reduce(_imm_aop, el) interpretation of imm attribute dictionary semantics
  _imm_aop = (el,[k,v],k0,attrs) => (
      '$=@_0'.includes(k0=k[0])
      ? ( // prefix match
        '$' === k0 // children to prepend
          ? (attrs.z ||= []).push(v)

        : '=' === k0 // direct property assignment
          ? _imm_cp(el, v, k.slice(1))

        : '@' === k0 // hook callback
          ? (v.call ? v(el,k) : v[k.slice(1)||'append'](el))

        : '_' === k0 // pass-through attrs, like _sep=' '
          ? attrs[k] = v

        // : 0 == k ? el = v // key of 0 indicates element in attrs[0]; however, this case is already handled by imm()

        : 0) // unreachable case

      // non-prefixed
      : v?.call // event handlers
        ? _el_on(el, k, v)

      // otherwise, attirbute values
      : _el_set(el, _dash_name(k), v)

      // return element for reduce protocol
      , el)


export function imm(el, ...args) {
  let attrs = args[0]
  ; _is_attr_dict(el)
        ? el = (attrs=el)[0] // el is attrs[0], and attrs is zeroth argument
    : _is_attr_dict(attrs)
        ? args[0] = null // attrs is args[0]; remove
    : attrs = null // no attrs in this invocation

  if (null != el) {
    if (null != attrs) {
      ;(attrs = Object.entries(attrs))
        .reduce(_imm_aop, el)

      // prepend children found in attrs.z
      el.prepend(... _imm_b(attrs.z, attrs._sep))
    }

    // append arguments as children
    el.append(... _imm_b(args, attrs?._sep))
  }
  return el
}


export const
  // clear all inner content (text and html)
  imm_set = (el, ...args) => imm(_imm0(el), ...args)


export function * _imm_b(iterable, _sep) {
  // Recursive interpretation of imm child elements.
  // Works with arrays, nodelists, and other iterables
  for (let c of iterable || [])
    if (null != c) {
      c = c.toDOM?.(c) ?? c.valueOf(c)

      if (_is_iter(c))
        yield * _imm_b(c, _sep)
      else {
        yield c.nodeType ? c // pass-through nodes
            : ''+c // otherwise force toString()

        if (_sep) yield _sep
      }
    }
}

