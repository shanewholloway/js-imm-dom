import { _imm_b, _imm_cp } from './imm_dom_core.mjs'
import { ImmCore, _el_ac } from './imm_elem_core.mjs'
export { Imm0, ImmCore } from './imm_elem_core.mjs'


const _wcdd = /* #__PURE__ */ { // ImmElem web component double dispatch
  c: o => o._render_(true), // -- connectedCallback()

  // look for an '^attr_name' method on self. If exists, call it with attribute change details.
  ac: (o,v) => _el_ac(o,v) && o._refresh_(), // -- attributeChangedCallback()

  '': o => o._stop_(), // -- disconnectedCallback()
}, _wctick = async o => (await o)._render_()

export class ImmElem extends ImmCore {
  init(/* ns, el, tgt */) { /* return _tgt_ (optional) */ }
  render(/* ns, el, tgt */) { /* return element to _show_() onto _tgt_ */ }
  // render0(/* ns, el, tgt */) { /* called on first render ; return element to _show_() onto _tgt_ */
  // render0$(/* ns, el, tgt */) { /* called on reconnected render ; return element to _show_() onto _tgt_ */

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
    _tgt_ ||= 0 !== _tgt_ ? this
      : this.attachShadow({mode: 'open'})

    let _z_ = [
      this._ns_, // _z_[0] : attribute proxy namespace
      this,      // _z_[1] : this/self
      _tgt_,     // _z_[2] : _tgt_ shadowRoot or element this/self
      -1,        // _z_[3] : _refresh_ block, set to -1 'before' connectedCallback
      ]
    Object.defineProperties(this, {
      _tgt_: {get: () => _z_[2], set: v => _z_[2]=v},
      _z_: {value: _z_} })
  }

  _render_(is_reconnect) {
    let node, _z_=this._z_,
        fn_render = is_reconnect && this.render0 || this.render$ || this.render
    if (is_reconnect) this.render0 = this.render0$
    _z_[3] = 0 // clear _refresh_ block
    node = fn_render.apply(this, _z_)
    this._show_(node)
  }

  _stop_() {
    this._z_[3] = 1 // set _refresh_ block to 1 'after' disconnectedCallback
    let fn = this.render$
    if (fn) {
      delete this.render$
      if (fn.stop) fn.stop()
    }
  }

  _show_(node, retain) {
    let [t] = typeof node,
      _tgt_ = this._tgt_,
      _show0_ = (...z) => {
        if (!retain) _tgt_.textContent = '' // clear all inner content (text and html)
        _tgt_.append(...z) }

    return (
      // on bool, refresh when true
      'b'==t ? node && this._refresh_()

      // on nullish; clear for null, or noop on undefined
      : null == node ? 'o'==t && _show0_()

      // on non-objects and DOM nodes, use el.append
      : 'o'!=t || node.nodeType ? _show0_(node)

      // on Promises
      : 'then' in node
        ? node.then(retain ? this._add_ : this._show_)

      // on iterables
      : Symbol.iterator in node
        ? _show0_(... _imm_b(node))

      // otherwise use DOM el.append
      : _show0_(node) )
  }

  _bind_(self) {
    // bind ._show_, ._add_, and ._refresh_ as closures
    let _show_ = self._show_.bind(self)
    return ({
      _show_,
      _add_: node => _show_(node, 1),
      _refresh_: p => p?.then?.(self._refresh_)
        || (self._z_[3] ||= _wctick(self)) // _debounce _refresh_ via Promise
    })
  }
}

export default ImmElem
