import { _el_set, _dash_name, _imm_cp } from './imm_utils.js'
import { with_ns_attr } from './imm_pxy.js'


const _subclass_unless = (klass, args) =>
  true === args[0] ? (args.shift(), klass)
  : class extends klass {}

const _ce = globalThis.customElements

export const
  imm_ac_on = el =>
    (old, value, attr) =>
      _el_set(el, attr, value),

  imm_when = tag =>
    _ce.whenDefined(tag = tag.tagName || tag)
      .then(klass => klass || _ce.get(tag)),

  imm_mixin = (klass, ... args) => (
    klass = _subclass_unless(klass, args),
    _imm_cp(klass.prototype, args[0]),
    _imm_cp(klass, args[1]))


export {imm_define as imm_define_when}
export async function imm_define(klass, tag, ...when) {
  for (let k of when)
    if (k) await k.trim ? _ce.whenDefined(k) : k
  _ce.define(_dash_name(tag), klass, tag.options)
  return klass
}

export function imm_observe(klass, ...attrs) {
  klass = _subclass_unless(klass, attrs)
  klass.observedAttributes = attrs
    .flat(9).map(_dash_name)
    .concat(klass.observedAttributes||[])
  return klass
}


export class Imm0 extends HTMLElement {
  static with(...args) {
    return imm_mixin(this, ...args)
  }
  static observe(...attrs) {
    return imm_observe(this, ...attrs)
  }
  static define(...args) {
    imm_define(this, ...args)
    return this
  }


  // _wc_(el, op, v) {} -- use static _wc_ to setup
  static _wc_(fnop, adapt) {
    return this.with(
      { _wc_: (self, op, v) => fnop[op]?.(self, v) },
      adapt && { adapt })
  }

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


export class ImmCore extends /* #__PURE__ */ with_ns_attr(Imm0) {
  static dom(dfn, proto_, kw) {
    if (proto_)
      kw = {...kw, ... (
        'object' === typeof proto_ ? proto_
          : this.adapt(proto_) )}

    if (dfn.trim) dfn = [dfn] // if string, make array
    return this // klass
      .with( kw ) // subclass
      .define(...dfn) // imm_define_when
  }
}

