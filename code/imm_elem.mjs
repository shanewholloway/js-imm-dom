import { _imm_b, _imm_cp } from './imm_dom_core.mjs'
import { ImmCore } from './imm_elem_core.mjs'
export { Imm0, ImmCore } from './imm_elem_core.mjs'


// look for an '^attr_name' method on self. If exists, call it with attribute change details.
const _ac_ = (self, [attr_name,v_old,v_new]) =>
    false !== self['^'+attr_name]?.(v_old, v_new, attr_name)

const _wcdd = /* #__PURE__ */ { // ImmElem web component double dispatch
  c: o => o._render_(true), // -- connectedCallback()
  ac: (o,v) => _ac_(o,v) && o._refresh_(), // -- attributeChangedCallback()
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
    _imm_cp(this, this._bind_(this))
    this.init(... this._z_)
  }

  _wc_(el,op,v) { _wcdd[op](this,v) }

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
    if (is_reconnect) {
      delete this.render0$
      this._refresh_ = this._refresh$_
    }
    this._show_(fn_render.apply(this, this._z_))
  }

  _stop_() {
    delete this._refresh_
    let fn = this.render$
    if (fn) {
      delete this.render$
      if (fn.stop) fn.stop()
    }
  }

  _refresh_() { return false }
  _show_(node, retain) {
    let [t] = typeof node,
      tgt = this._z_[2],
      _show0_ = (...z) => {
        if (!retain) tgt.textContent = '' // clear all inner content (text and html)
        tgt.append(...z) }

    return (
      // on bool, refresh when true
      'b'==t ? node && this._refresh_()

      // on nullish; clear for null, or noop on undefined
      : null == node ? 'o'==t && _show0_()

      // on objects and iterables...
      : 'o'==t && !node.nodeType ? (
        // on Promises
        'then' in node
            ? node.then(retain ? this._add_ : this._show_)

        // on iterables
        : Symbol.iterator in node
            ? _show0_(... _imm_b(node))

        // otherwise use DOM el.append
        : _show0_(node) )

      // otherwise use DOM el.append
      : _show0_(node) )
  }

  _bind_(self) {
    // bind ._show_, ._add_, and ._refresh_ as closures
    let _show_ = self._show_.bind(self)
    return ({
      _show_,
      _add_: node => _show_(node, 1),
      _refresh$_: p => p && p.then
        ? p.then(self._refresh_)
        : self.isConnected && self._render_(),
      render0$: self.render0 || self.render0$,
    })
  }
}

export default ImmElem
