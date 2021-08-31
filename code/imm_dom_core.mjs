import {_dash_name} from './imm_utils.mjs'

export function imm_set(el, ...args) {
  el.textContent = '' // clear all inner content (text and html)
  return imm(el, ...args)
}

const _is_array = Array.isArray
const _is_attr_dict = a =>
  'object' === typeof a
    && null !== a
    && !a.nodeType
    && !a.toDOM
    && !_is_array(a)

export function imm(el, ...args) {
  let len = args.length
  if (0 === len)
    return el // fast-path no arguments

  let pre, attrs = args[0]
  if (_is_attr_dict(attrs)) {
    args[0] = null // replace attrs null
    for (let [k,v] of Object.entries(attrs)) {
      if ('function' === typeof v) {
        el.addEventListener(k, v)

      } else switch (k[0]) {
        // inline alais for prepend
        case '$': pre = (pre || []).concat(v) ; break

        // inline alais for Object.assign
        case '=': Object.assign(el, v) ; break

        default: 
          let n = _dash_name(k)
          if (null == v)
            el.removeAttribute(n)
          else el.setAttribute(n, v)
      }
    }

    // prepend children found in attrs
    if (pre) _imm_b(pre, el, el.prepend)

    if (1 === len)
      return el // fast path -- attrs with no additional children to append
  }

  return _imm_b(args, el)
}

export function _imm_b(children, el, add=el.append) {
  add = add.bind(el)
  for (let c of children.flat(9)) {
    c = c && (c.toDOM || c.valueOf).call(c, c)
    if (null != c)
      add(c.nodeType ? c : `${c}`)
  }
  return el
}


export function imm_dom(host, namespaceURI) {
  let _el_ = namespaceURI
    ? host.createElementNS.bind(host, namespaceURI)
    : host.createElement.bind(host)

  let tag_fn = (tag, ...args) =>
    imm(tag.nodeType ? tag : _el_(tag), ...args)

  tag_fn.fragment = (...args) =>
    imm(host.createDocumentFragment(), null, ...args)

  tag_fn.text = host.createTextNode.bind(host)
  return tag_fn.tag = tag_fn
}

export function imm_emit(tgt, evt, detail) {
  tgt.dispatchEvent(
    new CustomEvent(evt, {detail})) }

