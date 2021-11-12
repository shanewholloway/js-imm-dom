import {imm_pxy_attr} from './imm_pxy.mjs'

export function with_imm_observe(klass, ...attrs) {
  attrs = attrs.flat(9).filter(Boolean)

  let oa='observedAttributes', v=klass[oa]
  if (v) v = attrs.concat(v)
  else {
    v = attrs
    klass = class extends klass {}
  }
  klass[oa] = v
  return klass
}

export class ImmCore extends HTMLElement {
  static observe(... attrs) {
    return with_imm_observe(this, ...attrs)
  }

  static define(tag_name, opt) {
    customElements.define(tag_name, this, opt)
    return this
  }
}

export class ImmElem extends ImmCore {
  init(/* ns, el */) {}
  render(/* ns, el */) { /* return element */ }


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
  connectedCallback() { this._render_(true) }
  attributeChangedCallback() { this._render_() }

  //-----------------
  // composed methods

  get _ns_() { return imm_pxy_attr(this) }
  _init_() {
    this._show_ = this._show_.bind(this)
    let tgt = this._tgt_ = this._init_tgt_(this) || this
    this._tgt_ = this.init(this._ns_, this, tgt) || tgt
  }
  _init_tgt_() {}

  _render_(/* is_new */) {
    this._show_(
      this.render(this._ns_, this, this._tgt_) )
  }

  _show_(node) {
    let tgt = this._tgt_

    if (this === node || tgt === node || null == node) {
      if (null === node)
        tgt.textContent = '' // clear all inner content (text and html)
      return // no-op
    }

    if (node.then) // async promise render
      return node.then(this._show_)

    // inlined optimized version of imm_set()
    tgt.textContent = '' // clear all inner content (text and html)
    tgt.append(node)
  }
}

export default ImmElem
