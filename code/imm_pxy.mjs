import {_dash_name as _dn} from './imm_utils.mjs'


const _imm_pxy_gset = /* #__PURE__ */  {
  get: (fn,k) => fn(k),
  set: (fn,k,v) => (fn(k,v), 1),
}
export const imm_pxy_gset = fn =>
  new Proxy(fn, _imm_pxy_fn)


const _imm_pxy = /* #__PURE__ */  {
  get(tag_fn, key, ns) {
    let r = tag_fn[key]
    if (undefined === r && /[a-z]/.test(key))
      ns[key] = r = tag_fn
        .bind(null, _dn(key))
    return r }}

export const imm_pxy_tag = (tag_fn, kw=tag_fn) =>
  ({ __proto__: new Proxy(tag_fn, _imm_pxy), ... kw })



const
  _mga = (el,k) => (k=el.getAttribute(k), ''==k || k),
  _mha = (el,k) => el.hasAttribute(k),
  _msa = (el,k,v) => (el.setAttribute(k,v), 1),
  _mra = (el,k) => (el.removeAttribute(k), 1),
  _imm_pxy_attr = /* #__PURE__ */ {
    get: (el,k) => _mga(el, _dn(k)) || _mga(el, k),
    has: (el,k) => _mha(el, _dn(k)) || _mha(el, k),
    set: (el,k,v) => _msa(el, _dn(k), v),
    deleteProperty: (el,k) => _mra(el, _dn(k)) || _mra(el, k),
  }

export const imm_pxy_attr = el =>
  new Proxy(el, _imm_pxy_attr)


export function imm_pxy_css(css_style) {
  let _css_prop = css_style.getPropertyValue.bind(css_style)
  return imm_pxy_gset(k => _css_prop(_dn(k))) }

