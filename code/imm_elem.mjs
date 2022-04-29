import { _imm_b, _imm_cp } from './imm_dom_core.mjs'
import { ImmCore } from './imm_elem_core.mjs'
export { Imm0, ImmCore } from './imm_elem_core.mjs'


const _wcdd = /* #__PURE__ */ { // ImmElem web component double dispatch
  c: o => o._render_(true), // -- connectedCallback()
  ac: o => o._refresh_(), // -- attributeChangedCallback()
  '': o => o._stop_(), // -- disconnectedCallback()
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

  _wc_(el,op) { _wcdd[op](this) }

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
