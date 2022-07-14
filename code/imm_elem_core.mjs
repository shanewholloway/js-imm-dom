import { _el_set, _dash_name } from './imm_utils.mjs'
import { _imm_cp } from './imm_dom_core.mjs'
import { with_ns_attr } from './imm_pxy.mjs'


const _ce = /* #__PURE__ */ customElements

export const
  imm_ac_on = el =>
    (old, value, attr) =>
      _el_set(el, attr, value),

  imm_when = tag_name =>
    _ce.whenDefined(tag_name)
      .then(el => el || _ce.get(tag_name))


export {imm_define as imm_define_when}
export async function imm_define(klass, tag, ...when) {
  for (let k of tag.when || when)
    if (k) await k.then ? k : _ce.whenDefined(k)
  _ce.define(tag.tag || tag, klass, tag.options)
  return klass
}

export function imm_observe(klass, ...attrs) {
  klass.observedAttributes = attrs
    .flat(9).map(_dash_name)
    .concat(klass.observedAttributes||[])
  return klass
}


export class Imm0 extends HTMLElement {
  static with(proto_, static_) {
    let klass = class extends this {}
    _imm_cp(klass.prototype,
      proto_?.call ? {_wc_: proto_} // functions replace _wc_
        : proto_)
    return _imm_cp(klass, static_)
  }

  static define(...args) {
    imm_define(this, ...args)
    return this
  }

  static observe(... attrs) {
    return imm_observe(this.with(), ...attrs)
  }

  _wc_(el,op) {}
  connectedCallback() { this._wc_(this, 'c') }
  disconnectedCallback() { this._wc_(this, '') }
  attributeChangedCallback(attr_name, v_old, v_new) {
    // look for an '^attr_name' method on this.
    // If exists, call it with attribute change details.
    if (false !== this['^'+attr_name]?.(v_old, v_new, attr_name)) {
      // if not false, call _wc_ attribute changed callback for update or _refresh_ semantics
      this._wc_(this, 'ac', [attr_name, v_old, v_new])
    }
  }
}


export class ImmCore extends with_ns_attr(Imm0) {
  static dom(dfn, proto_, kw) {
    if (dfn.trim) dfn = [dfn]
    return this // klass
      ._use(proto_||null, kw)
      .define(...dfn)
  }

  static _use(proto_, kw) {
    if ('object' !== typeof proto_)
      proto_ = this._zuse(proto_)

    return this.with( kw ? {...kw, ...proto_} : proto_ )
  }

  static _zuse(z) { return {_wc_:z} }
}

export class ImmNS extends ImmCore {
  _wc_(el,op) { op && el.update(el._ns_, el) }
  static _zuse(z) { return {update:z} }
  update() {}
}

