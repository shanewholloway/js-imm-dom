import {_dash_name} from './imm_utils.mjs'

export function imm_clear(el) {
  el.textContent = '' // clear all content
  return el
}

export function imm_set1(el, node) {
  return imm_clear(el).append(node)
}

export function imm_set(el, attrs, children) {
  return imm(imm_clear(el), attrs, children)
}

export function imm(el, attrs, children) {
  if (null == attrs) ;
  else if ('object' !== typeof attrs || attrs.nodeType) {
    children = [attrs, ... children || []]
  } else {
    let set = el.setAttribute.bind(el)
    for (let [k,v] of Object.entries(attrs))
      set(_dash_name(k), v)
  }

  if (children) {
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

export function imm_flat(tgt, host) {
  return ('string' === typeof tgt || tgt == null || tgt.nodeType) ? tgt
    : imm_frag(iterable, host)
}

export function imm_frag(iterable, host=document) {
  let fragment = (host.ownerDocument || host).createDocumentFragment()
  for (let e of iterable)
    fragment.append(e)
  return fragment
}

export function imm_dom(host, namespaceURI) {
  let _el_ = namespaceURI
    ? host.createElementNS.bind(host, namespaceURI)
    : host.createElement.bind(host)

  let tag_fn = (tag, attrs, ...children) =>
    imm(tag.nodeType ? tag : _el_(tag), attrs, children)

  tag_fn.fragment = host.createDocumentFragment.bind(host)
  tag_fn.text = host.createTextNode.bind(host)
  return tag_fn.tag = tag_fn
}

