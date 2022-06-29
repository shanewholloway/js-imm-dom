import { _imm_b, _imm_cp } from './imm_dom_core.mjs'
import { imm_pxy_attr } from './imm_pxy.mjs'


// look for an '^attr_name' method on self. If exists, call it with attribute change details.
export const _el_ac = (self, [attr_name,v_old,v_new]) =>
    false !== self['^'+attr_name]?.(v_old, v_new, attr_name)

export const imm_ac_on = el =>
  (old, value, attr) =>
    el.setAttribute(attr, value)


const _ce = /* #__PURE__ */ customElements
export function imm_when(tag_name) {
  return _ce.whenDefined(tag_name)
    .then(el => el || _ce.get(tag_name))
}

export async function imm_define_when(klass, tag, ...when) {
  for (let k of tag.when || when)
    if (k) await k.then ? k : _ce.whenDefined(k)
  _ce.define(tag.tag || tag, klass, tag.options)
  return klass
}


export class Imm0 extends HTMLElement {
  static with(proto_, static_) {
    let klass = class extends this {}
    _imm_cp(klass.prototype, proto_)
    return _imm_cp(klass, static_)
  }

  static define(...args) {
    imm_define_when(this, ...args)
    return this
  }

  static dom(dfn, proto_, kw) {
    if (dfn.trim) dfn = [dfn]
    return this // klass
      ._use(proto_||null, kw)
      .define(...dfn)
  }

  static observe(... attrs) {
    attrs.push(this.observedAttributes)
    attrs = attrs.flat(9).filter(Boolean)
    return this.with(null, {observedAttributes: attrs})
  }

  static _use(proto_, kw) {
    if ('object' !== typeof proto_)
      proto_ = this._zuse(proto_)

    return this.with( kw ? {...kw, ...proto_} : proto_ )
  }

  static _zuse(z) { return {connectedCallback:z} }
}


export class Imm1 extends Imm0 {
  static _zuse(z) { return {update:z} }
  update() {}

  connectedCallback() { this.update(this, this._ns_) }
  attributeChangedCallback(...args) { _el_ac(this, args) }
}


export class ImmWC extends Imm0 {
  static _zuse(z) { return {_wc_:z} }
  _wc_(el,op) {}

  connectedCallback() { this._wc_(this, 'c') }
  attributeChangedCallback(...args) { this._wc_(this, 'ac', args) }
  disconnectedCallback() { this._wc_(this, '') }
}


export const with_ns_attr = ImmKlass =>
  class extends ImmKlass {
    get _ns_() { return imm_pxy_attr(this) }
  }

export const ImmNS = /* #__PURE__ */
  with_ns_attr(Imm1)

export const ImmCore = /* #__PURE__ */
  with_ns_attr(ImmWC)

