import {_dash_name, _prop_name, _el_get, _el_has, _el_set} from './imm_utils.js'


const _imm_pxy_gset = /* #__PURE__ */ {
  get: (fn,k) => fn(k),
  set: (fn,k,v) => (fn(k,v), 1),
}
export const imm_pxy_gset = fn =>
  new Proxy(fn, _imm_pxy_gset)


const _imm_pxy = /* #__PURE__ */ {
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
    // use k.trim to avoid Symbols
    get: ({$,_},k) => k.trim && (_el_get($, _dash_name(k)) ?? _el_get($, k) ?? _?.[k]),
    has: ({$},k) => k.trim && (_el_has($, _dash_name(k)) || _el_has($, k)),
    set: ({$},k,v) => _el_set($, _dash_name(k), v),
    // set to null is delete
    deleteProperty: ({$},k) => _el_set($, _dash_name(k)) || _el_set($, k),

    // update the proxy for each attribute to leverage default implementation of getOwnPropertyDescriptor()
    ownKeys: pxy => Array.from(pxy.$.getAttributeNames(), k => (k=_prop_name(k), pxy[k] ??= k)),
  }

export const imm_pxy_attr = ($,_) =>
  new Proxy({$,_}, _imm_pxy_attr) // $ is element, _ is the attribute default value fallback

export const with_ns_attr = ImmKlass =>
  class extends ImmKlass {
    get _ns_() { return imm_pxy_attr(this, this.constructor._ns_) }
  }


export function imm_pxy_css(css_style) {
  let _css_prop = css_style.getPropertyValue.bind(css_style)
  return imm_pxy_gset(k => _css_prop(_dash_name(k))) }

