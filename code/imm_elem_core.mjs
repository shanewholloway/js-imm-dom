import {imm_pxy_attr} from './imm_pxy.mjs'

export class ImmCoreElem extends HTMLElement {
  static imm_c(fn_render, with_proto) {
    let ImmCE = class extends this {}
    let {prototype} = ImmCE
    prototype._render_fn = fn_render

    if (with_proto) {
      let fn_init = with_proto(prototype, ImmCE)
      if (fn_init && ! prototype._init) {
        // don't overwrite if defined by subclass
        prototype._init = fn_init
      }
    }

    // Proxy spy to find observed attributes
    let attrs = new Set()
    fn_render(new Proxy({}, {get(t,n) { attrs.add(n) }}))
    ImmCE.observedAttributes = [... attrs]
    return ImmCE
  }

  static define(tag_name) {
    customElements.define(tag_name, this)
    return this
  }


  static dom(tag_name, fn_render) {
    return this
      .imm_c(fn_render, proto => proto._init_dom)
      .define(tag_name)
  }
  _init_dom() {}


  static elem(tag_name, fn_render) {
    return this
      .imm_c(fn_render, proto => proto._init_elem)
      .define(tag_name)
  }
  _init_elem() {
    this._render_tgt = this.attachShadow({mode: 'open'})
  }


  constructor() { super(); this._init(this) }

  render(... args) {
    this._rendered_as(
      this._render_fn(
        imm_pxy_attr(this),
        this, ... args) )
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
