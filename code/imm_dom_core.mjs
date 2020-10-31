import {_dash_name} from './_imm_utils.mjs'

export function imm(el, attrs, children=[]) {
  if (null == attrs) ;
  else if ('object' !== typeof attrs || attrs.nodeType)
    children.unshift(attrs)
  else {
    let set = el.setAttribute.bind(el)
    for (let [k,v] of Object.entries(attrs))
      set(_dash_name(k), v)
  }

  if (0 !== children.length) {
    let append = el.append.bind(el)
    for (let c of children) {
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

  let tag_fn = (tag, attrs, ...children) =>
    imm(tag.nodeType ? tag : _el_(tag), attrs, children)

  tag_fn.text = host.createTextNode.bind(host)
  return tag_fn.tag = tag_fn
}

