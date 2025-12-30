import {
  _dash_name,
  _is_attrs, _is_iter,
  _el_set, _el_on,
  _imm0, _imm_cp
} from './imm_dom_utils.js'
export { _imm0, _imm_cp }


// complex expressions to avoid keywords like 'if', 'else', 'return', 'switch', 'case', 'default'.
const
  // .reduce(_imm_aop, el) interpretation of imm attribute dictionary semantics
  _imm_aop = (el,[k,v],k0,attrs) => (
      '$/=@_0'.includes(k0=k[0])
      ? ( // prefix match
        '$' === k0 // children to prepend
          ? _imm_b(attrs.z ??= [], v)

        : '/' === k0 // clear and prepend children
          ? (attrs.c=true, _imm_b(attrs.z ??= [], v))

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

  , _with_sep = (sep, list) => (sep
      ? list.flatMap((e,i) => i===0 ? [e] : [sep, e])
      : list)


export function imm(el, ...args) {
  let z1, attrs=_is_attrs(el) ? [el] : []
  for (let a of args)
    if (undefined !== z1) _imm_b(z1, a)
    else if (_is_attrs(a)) attrs.push(a)
    else _imm_b(z1=[], a)

  attrs = attrs.flatMap(Object.entries)
  el = attrs.reduce(_imm_aop, el)
  if (el) {
    if (attrs.c) el.textContent = ''

    // prepend children found in attrs.z
    el.prepend(... _with_sep(attrs._sep, attrs.z))

    // append (maybe nested) children
    el.append(... _with_sep(attrs._sep, z1))
  }
  return el
}


export const
  // clear all inner content (text and html)
  imm_set = (el, ...args) => imm(el, {'/':null}, ...args)



export function _imm_b(list, iterable) {
  // Recursive interpretation of imm child elements.
  // Works with arrays, nodelists, and other iterables
  for (let c of iterable || [])
    if (null != c) {
      c = c.toDOM?.(c) ?? c.valueOf(c)

      if (_is_iter(c))
        _imm_b(list, c)
      else list.push(
        c.nodeType ? c // pass-through nodes
            : ''+c) // otherwise force toString()
    }
  return list
}

