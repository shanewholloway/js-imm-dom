import {_dash_name} from './imm_utils.mjs'

const _imm_pxy = {
  get(tag_fn, key, ns) {
    let r = tag_fn[key]
    if (undefined === r && /[a-z]/.test(key))
      ns[key] = r = tag_fn
        .bind(null, _dash_name(key))
    return r }}

export const imm_pxy_tag = (tag_fn, kw=tag_fn) =>
  ({ __proto__: new Proxy(tag_fn, _imm_pxy), ... kw })

export const _imm_pxy_get = (gattr, host) =>
  new Proxy(host || {}, { get: (t,k) => gattr(k) })

export const imm_pxy_attr = el =>
  _imm_pxy_get(el.getAttribute.bind(el))

export function imm_pxy_css(css_style) {
  let _css_prop = css_style.getPropertyValue.bind(css_style)
  return _imm_pxy_get(k => _css_prop(_dash_name(k))) }

