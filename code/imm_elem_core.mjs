import { _imm_b, _imm_cp } from './imm_dom_core.mjs'
import { imm_pxy_attr } from './imm_pxy.mjs'


const _ce = /* #__PURE__ */ customElements
export function imm_when(tag_name) {
  return _ce.whenDefined(tag_name)
    .then(el => el || _ce.get(tag_name))
}

export async function imm_define_when(klass, tag, ...when) {
  for (let k of when)
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

  static _use(proto_, kw) {
    if ('object' !== typeof proto_)
      proto_ = this._zuse(proto_)

    return this.with( kw ? {...kw, ...proto_} : proto_ )
  }

  static _zuse(z) { return {connectedCallback:z} }
}


export class ImmCore extends Imm0 {
  get _ns_() { return imm_pxy_attr(this) }

  static observe(... attrs) {
    attrs.push(this.observedAttributes)
    attrs = attrs.flat(9).filter(Boolean)
    return this.with(null, {observedAttributes: attrs})
  }

  //--------------------------------------
  // web component composed implementation

  connectedCallback() { this._wc_('c') }
  attributeChangedCallback(n) { this._wc_('ac', n) }
  disconnectedCallback() { this._wc_('d') }
  _wc_(op) {}

  static _zuse(z) { return {_wc_:z} }
}


const _wcdd = /* #__PURE__ */ { // ImmElem web component double dispatch
  c: o => o._render_(true), // -- connectedCallback()
  ac: o => o._refresh_(), // -- attributeChangedCallback()
  d: o => o._stop_(), // -- disconnectedCallback()
}

export class ImmElem extends ImmCore {
  init(/* ns, el, tgt */) { /* return _tgt_ (optional) */ }
  render(/* ns, el, tgt */) { /* return element to _show_() onto _tgt_ */ }
  // render0(/* ns, el, tgt */) { /* called on first render ; return element to _show_() onto _tgt_ */

  static _zuse(fn) { return {render: fn} }
  static elem(dfn, proto_) { return this.dom(dfn, proto_, {_tgt_: 0}) }

  //--------------------------------------
  // web component composed implementation

  constructor() {
    super()
    this._init_tgt_(this._tgt_)
    _imm_cp(this, this._bind_())
    this.init(... this._z_)
  }

  _wc_(op,v) { _wcdd[op](this) }

  _init_tgt_(_tgt_) {
    if (!_tgt_ || !_tgt_.nodeType)
      _tgt_ = 0 !== _tgt_ ? this
        : this.attachShadow({mode: 'open'})

    let _z_ = [this._ns_, this, _tgt_]
    Object.defineProperties(this, {
      _tgt_: {get: () => _z_[2], set: v => _z_[2]=v},
      _z_: {value: _z_} })
  }

  _render_(is_reconnect) {
    let fn_render = is_reconnect && this.render0$ || this.render$ || this.render
    if (is_reconnect) delete this.render0$
    this._show_(fn_render.apply(this, this._z_))
  }

  _stop_() {
    let fn = this.render$
    if (fn) {
      if (fn.stop) fn.stop()
      delete this.render$
    }
  }

  _show_(node, retain) {
    let tgt = this._tgt_
    if (this === node || tgt === node || null == node) {
      if (null === node && !retain)
        tgt.textContent = '' // clear all inner content (text and html)
      return // no-op
    }

    // inlined optimized version of imm_set()
    if (! retain) tgt.textContent = '' // clear all inner content (text and html)

    if ('string' !== typeof node) {
      if ('then' in node)
        return node.then(retain ? this._add_ : this._show_)

      if (!node.nodeType && Symbol.iterator in node)
        return void tgt.append(... _imm_b(node))
    }
    return void tgt.append(node)
  }

  _bind_() {
    // bind ._show_, ._add_, and ._refresh_ as closures
    let _show_ = this._show_.bind(this)
    return ({
      _show_,
      _add_: node => _show_(node, 1),
      _refresh_: p => p && p.then
        ? p.then(this._refresh_)
        : this.isConnected && this._render_(),
      render0$: this.render0, // use render0 as first render0$
    })
  }
}

export default ImmElem


