import {imm_pxy_attr} from './imm_pxy.mjs'

export class ImmElem extends HTMLElement {
  init(/* ns, el */) {}
  render(/* ns, el */) { /* return element */ }


  static define(tag_name) {
    customElements.define(tag_name, this)
    return this
  }

  //--------------------------
  // function-based defintions

  init_dom() {}
  static dom(tag_name, ... fn_v) {
    return this // klass
      ._imm_c(fn_v, proto => { proto._init_tgt_ = proto.init_dom })
      .define(tag_name)
  }

  init_elem() { return this.attachShadow({mode: 'open'}) }
  static elem(tag_name, ... fn_v) {
    return this // klass
      ._imm_c(fn_v, proto => { proto._init_tgt_ = proto.init_elem })
      .define(tag_name)
  }

  static _imm_c(fn_v, with_proto) {
    let ImmCE = class extends this {}
    let proto = ImmCE.prototype
    with_proto(proto, ImmCE)
    return ImmCE._imm_cfn(proto, fn_v)
  }
  static _imm_cfn(proto, fn_v) {
    // render is last argument
    proto.render = fn_v.pop() || proto.render
    // init is optional first argument
    proto.init = fn_v.shift() || proto.init
    return this
  }


  //--------------------------------------
  // web component composed implementation

  constructor() { super(); this._init_(this) }
  connectedCallback() { this._render_() }
  attributeChangedCallback() { this._render_() }

  //-----------------
  // composed methods

  _init_() {
    let tgt = this._tgt_ = this._init_tgt_(this) || this
    this._tgt_ = this.init(imm_pxy_attr(this), this, tgt) || tgt
  }
  _init_tgt_() {}

  _render_() {
    this._show_(
      this.render(imm_pxy_attr(this), this, this._tgt_) )
  }

  _show_(node) {
    if (this === node || null == node)
      return // no-op

    if (node.then) // async promise render
      return node.then(node => this._show_(node))

    // inlined optimized version of imm_set()
    let tgt = this._tgt_
    tgt.textContent = '' // clear all inner content (text and html)
    tgt.append(node)
  }
}

export default ImmElem
