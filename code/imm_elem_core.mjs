import { _imm_b } from './imm_dom_core.mjs'
import { imm_pxy_attr } from './imm_pxy.mjs'


export function imm_when(tag_name, ce) {
  return (ce=customElements)
    .whenDefined(tag_name)
    .then(el => el || ce.get(tag_name))
}


export class ImmCore extends HTMLElement {
  static observe(... attrs) {
    let klass = class extends this {}
    let oa = 'observedAttributes'
    attrs.push(klass[oa])
    klass[oa] = attrs.flat(9).filter(Boolean)
    return klass
  }

  get _ns_() { return imm_pxy_attr(this) }


  static define(tag_name, opt) {
    customElements.define(tag_name, this, opt)
    return this
  }
}


export class ImmElem extends ImmCore {
  init(/* ns, el, tgt */) { /* return _tgt_ (optional) */ }
  render(/* ns, el, tgt */) { /* return element to _show_() onto _tgt_ */ }
  // render0(/* ns, el, tgt */) { /* called on first render ; return element to _show_() onto _tgt_ */

  //--------------------------
  // function-based defintions

  static dom(tag_name, ... args) {
    return this // klass
      ._imm_c(args)
      .define(tag_name)
  }

  static elem(tag_name, ... args) {
    return this // klass
      ._imm_c(args)
      ._imm_cv({_tgt_: 0})
      .define(tag_name)
  }

  static _imm_c(args, _tgt_) {
    if (1 < args.length) throw new TypeError() //'No longer supports multiple arguments')
    let klass = class extends this {}
    return args[0]
      ? klass._imm_cv(...args)
      : klass
  }

  static _imm_cv(v) {
    if (v && v.bind)
      v = {render: v}
    Object.assign(this.prototype, v)
    return this
  }


  //--------------------------------------
  // web component composed implementation

  constructor() {
    super()
    this._init_tgt_(this._tgt_)
    Object.assign(this, this._bind_())
    this.init(... this._z_)
  }
  connectedCallback() { this._render_(true) }
  attributeChangedCallback() { this._refresh_() }
  disconnectedCallback() { this._stop_() }

  _init_tgt_(_tgt_) {
    if (!_tgt_ || !_tgt_.nodeType)
      _tgt_ = 0 !== _tgt_ ? this
        : this.attachShadow({mode: 'open'})

    let _z_ = [this._ns_, this, _tgt_]
    Object.defineProperties(this, {
      _tgt_: {get: () => _z_[2], set: v => _z_[2]=v},
      _z_: {value: _z_} })
  }

  _render_(is_new) {
    let fn_render = is_new && this.render0 || this.render$ || this.render
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

    if ('then' in node)
      return node.then(retain ? this._add_ : this._show_)

    // inlined optimized version of imm_set()
    if (! retain) tgt.textContent = '' // clear all inner content (text and html)
    if (!node.nodeType && Symbol.iterator in node)
      tgt.append(... _imm_b(node))
    else tgt.append(node)
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
    })
  }
}

export default ImmElem


