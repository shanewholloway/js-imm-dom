import {_dash_name, _el_get, _el_has, _el_set, _el_rm} from './imm_utils.mjs'


const _imm_pxy_gset = /* #__PURE__ */  {
  get: (fn,k) => fn(k),
  set: (fn,k,v) => (fn(k,v), 1),
}
export const imm_pxy_gset = fn =>
  new Proxy(fn, _imm_pxy_gset)


const _imm_pxy = /* #__PURE__ */  {
  get(tag_fn, key, ns) {
    let r = tag_fn[key]
    if (undefined === r && /[a-z]/.test(key))
      ns[key] = r = tag_fn
        .bind(null, _dash_name(key))
    return r }}

export const imm_pxy_tag = (tag_fn, kw=tag_fn) =>
  ({ __proto__: new Proxy(tag_fn, _imm_pxy), ... kw })



const
  _imm_pxy_attr = /* #__PURE__ */ {
    get: (el,k) => _el_get(el, _dash_name(k)) || _el_get(el, k),
    has: (el,k) => _el_has(el, _dash_name(k)) || _el_has(el, k),
    set: (el,k,v) => _el_set(el, _dash_name(k), v),
    deleteProperty: (el,k) => _el_rm(el, _dash_name(k)) || _el_rm(el, k),
  }

export const imm_pxy_attr = el =>
  new Proxy(el, _imm_pxy_attr)


export function imm_pxy_css(css_style) {
  let _css_prop = css_style.getPropertyValue.bind(css_style)
  return imm_pxy_gset(k => _css_prop(_dash_name(k))) }

