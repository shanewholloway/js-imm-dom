import {imm_set1} from './imm_dom_core.mjs'
const _render_sym = Symbol('imm_elem')

export class ImmCoreElem extends HTMLElement {
  static imm_c(fn_render, init) {
    let ImmCE = class extends this {}
    let {prototype} = ImmCE
    prototype[_render_sym] = fn_render

    if (init && !prototype._init) {
      // don't overwrite if defined by subclass
      ImmCE.prototype._init = init
    }

    // Proxy spy to find observed attributes
    let attrs = new Set()
    fn_render(new Proxy({}, {get(t,n) { attrs.add(n) }}))
    ImmCE.observedAttributes = [... attrs]
    return ImmCE
  }

  static _define(tag_name) {
    customElements.define(tag_name, this)
    return this
  }


  static dom(tag_name, fn_render) {
    return this
      .imm_c(fn_render, this._init_dom)
      ._define(tag_name)
  }
  static _init_dom(el_self) { }


  static elem(tag_name, fn_render) {
    return this
      .imm_c(fn_render, this._init_elem)
      ._define(tag_name)
  }
  static _init_elem(el_self) {
    el_self.attachShadow({mode: 'open'})
  }


  constructor() { super(); this._init(this) }

  render(... args) {
    let {_pxy_} = this
    if (!_pxy_) {
      let gattr = this.getAttribute.bind(this)
      this._pxy_ = _pxy_ =
        new Proxy({}, { get: (t,k) => gattr(k) })
    }

    let el_res = this[_render_sym](_pxy_, this, ... args)
    if (this !== el_res && null != el_res)
      this._rendered_as(el_res)
  }

  _rendered_as(el_res) {
    imm_set1(
      this._render_tgt || this.shadowRoot || this,
      el_res)
  }
}

export default ImmCoreElem
