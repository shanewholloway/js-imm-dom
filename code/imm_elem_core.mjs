import {imm_pxy_attr} from './imm_pxy.mjs'

export class ImmCoreElem extends HTMLElement {
  static _imm_c(fn_args_v, with_proto) {
    let ImmCE = class extends this {}
    let prototype = ImmCE.prototype

    if (with_proto) {
      let fn_init = with_proto(prototype, ImmCE)
      if (fn_init && ! prototype._init) {
        // don't overwrite if defined by subclass
        prototype._init = fn_init
      }
    }

    // render is last argument
    let _render_fn = prototype._render_fn = fn_args_v.pop()

    // init is first argument
    prototype._init_fn = fn_args_v.shift() || prototype._init_fn

    return ImmCE._imm_o(_render_fn)
  }

  static _imm_o(_render_fn) {
    // Proxy spy to find observed attributes
    let attrs = new Set()
    let spy = new Proxy({}, {get(t,n) { attrs.add(n) }})

    _render_fn(spy)
    this.observedAttributes = [... attrs]
    return this
  }

  static define(tag_name) {
    customElements.define(tag_name, this)
    return this
  }


  static dom(tag_name, ... fn_args_v) {
    return this
      ._imm_c(fn_args_v, proto => proto._init_dom)
      .define(tag_name)
  }
  _init_dom() {}


  static elem(tag_name, ... fn_args_v) {
    return this
      ._imm_c(fn_args_v, proto => proto._init_elem)
      .define(tag_name)
  }
  _init_elem() {
    this._render_tgt = this.attachShadow({mode: 'open'})
  }


  constructor() {
    super()
    this._init(this)
    this._init_fn( imm_pxy_attr(this), this)
  }

  _init_fn(/* ns, el*/) {}
  // _render_fn(/* ns, el, ... args*/) {}

  render() {
    this._rendered_as(
      this._render_fn( imm_pxy_attr(this), this) )
  }

  _rendered_as(node) {
    if (this !== node && null != node) {
      // inlined optimized version of imm_set()
      let el = this._render_tgt || this
      el.textContent = '' // clear all inner content (text and html)
      el.append(node)
    }
  }
}

export default ImmCoreElem
