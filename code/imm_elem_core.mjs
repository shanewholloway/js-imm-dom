const _render_sym = Symbol('imm_elem')

export class ImmCoreElem extends HTMLElement {
  static imm_c(fn_render, init) {
    // Proxy spy to grab observed attrs names
    let attrs = new Set()
    fn_render(new Proxy({}, {get(t,n) { attrs.add(n) }}))

    let ImmCE = class extends this {}
    ImmCE.observedAttributes = [... attrs]
    ImmCE.prototype[_render_sym] = fn_render
    if (init) ImmCE.prototype._init = init
    return ImmCE
  }

  static _define(tag_name) {
    customElements.define(tag_name, this)
    return this
  }

  static shadow(tag_name, fn_render) {
    return this
      .imm_c(fn_render, _init_shadow)
      ._define(tag_name) }

  static dom(tag_name, fn_render) {
    return this
      .imm_c(fn_render)
      ._define(tag_name) }


  constructor() { super(); this._init(this) }
  _init() {}

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
    let self = this.shadowRoot || this
    self.textContent = '' // clear all content
    self.append(el_res) // set as only content
  }
}

function _init_shadow() { this.attachShadow({mode: 'open'}) }

export default ImmCoreElem
