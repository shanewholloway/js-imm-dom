import {_dash_name} from './imm_utils.mjs'

export function imm_set(el, ...args) {
  el.textContent = '' // clear all inner content (text and html)
  return imm(el, ...args)
}

export function imm(el, ...args) {
  if ('object' === typeof args[0] && null !== args[0] && !args[0].nodeType) {
    for (let [k,v] of Object.entries(args.shift())) {
      if ('function' === typeof v) {
        el.addEventListener(k, v)
      } else {
        el.setAttribute(_dash_name(k), v)
      }
    }
  }

  if (0 !== args.length) {
    let append = el.append.bind(el)
    for (let c of args.flat()) {
      if (null != c) {
        c = c.valueOf()
        if (!c.nodeType)
          c = `${c}`
        append(c)
      }
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

