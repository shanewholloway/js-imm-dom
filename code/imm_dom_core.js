import {
  _dash_name,
  _is_attrs, _is_iter,
  _el_set, _el_on,
  _imm0, _imm_cp
} from './imm_utils.js'
export { _imm0, _imm_cp }


// complex expressions to avoid keywords like 'if', 'else', 'return', 'switch', 'case', 'default'.
const
  // .reduce(_imm_aop, el) interpretation of imm attribute dictionary semantics
  _aop = (el,[k,v],k0,args) => (
      '$=@_0'.includes(k0=k[0])
      ? ( // prefix match
        '$' === k0 // children to prepend
          ? args.z(k,v)

        : '=' === k0 // direct property assignment
          ? _imm_cp(el, v, k.slice(1))

        : '@' === k0 // hook callback
          ? (v.call ? v(el,k) : v[k.slice(1)||'append'](el))

        // : 0 == k ? el = v // key of 0 indicates element in args[0]; however, this case is already handled by imm()

        : 0) // unreachable case

      // non-prefixed
      : v?.call // event handlers
        ? _el_on(el, k, v)

      // otherwise, attirbute values
      : _el_set(el, _dash_name(k), v)

      // return element for reduce protocol
      , el)

  , _aop_attrs = (a,i,args) => (
      _is_attrs(a) ? Object.entries(a)
        : [['$$', _imm_c([], args.splice(i))]] )


export function imm(el, ...args) {
  el &&= el.nodeType ? el : (args.unshift(el), el[0])
  args = args.flatMap(_aop_attrs)
  if (el) {
    let z0=[], z1=[], clear
    args.z = (k,v) => (
      '$_'===k ? clear=1 : 0,
      _imm_c('$$'===k ? z1 : z0, v))

    args.reduce(_aop, el)

    if (clear) el.textContent = ''
    el.prepend(...z0)
    el.append(...z1)
  }
  return el
}


export const
  // clear all inner content (text and html)
  imm_set = (el, ...args) => imm(el, {$_:null}, ...args)


export const _imm_c = (result, content) => (
  null == content ? 0 : // if content is not null
    _is_iter(content = content.toDOM?.(content) ?? content.valueOf(content))
      ? [...content].reduce(_imm_c, result) // reductively add contents of iterable
      : result.push(content.nodeType ? content : ''+content) // otherwise pass-through nodes; otherwise force toString()
  , result)

export const imm_join = (sep, content, result=[]) =>
  _imm_c(result, content)
    .flatMap((e,i) => i ? [e] : [sep??' ', e])

