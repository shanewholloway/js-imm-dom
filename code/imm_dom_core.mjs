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
    && !_is_array(a)

export function imm(el, ...args) {
  if (0 === args.length) return el

  let attrs = args[0]
  if (_is_attr_dict(attrs)) {
    args[0] = null // replace attrs null
    for (let [k,v] of Object.entries(attrs)) {
      if ('function' === typeof v) {
        el.addEventListener(k, v)
      } else if ('$' === k[0]) {
        // replace attrs with children
        args[0] = (args[0] || []).concat(v)
      } else {
        el.setAttribute(_dash_name(k), v)
      }
    }
    if (!args[0] && 1 === args.length)
      return el // fast path -- no children to append
  }

  let append = el.append.bind(el)
  for (let c of args.flat()) {
    if (null != c) {
      c = c.valueOf()
      if (!c.nodeType)
        c = `${c}`
      append(c)
    }
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

