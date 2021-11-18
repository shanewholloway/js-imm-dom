import {imm_pxy_attr} from './imm_pxy.mjs'


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

  static define(tag_name, opt) {
    customElements.define(tag_name, this, opt)
    return this
  }
}


export class ImmElem extends ImmCore {
  init(/* ns, el, tgt */) { /* return _tgt_ (optional) */ }
  render(/* ns, el, tgt */) { /* return element to _show_() onto _tgt_ */ }

  //--------------------------
  // function-based defintions

  static dom(tag_name, ... args) {
    return this // klass
      ._imm_c(args)
      .define(tag_name)
  }

  static elem(tag_name, ... args) {
    args.push({_tgt_: 0})
    return this // klass
      ._imm_c(args)
      .define(tag_name)
  }

  static _imm_c(args) {
    let klass = class extends this {}
    args.reduceRight(klass._imm_cz,
      {r:klass.prototype,
       z:['init', 'render']})
    return klass
  }
  static _imm_cz(ctx, v) {
    // _imm_c optional args as reduceRight algorithm
    if ('function' === typeof v)
      ctx.r[ctx.z.pop()] = v
    else Object.assign(ctx.r, v)
    return ctx
  }


  //--------------------------------------
  // web component composed implementation

  constructor() {
    super()
    this._tgt_ = this._init_tgt_(this._tgt_)
    Object.assign(this, this._bind_())
    this.init(this._ns_, this, this._tgt_)
  }
  connectedCallback() { this._render_(true) }
  attributeChangedCallback() { this._refresh_() }

  _init_tgt_(_tgt_) {
    return 0 !== _tgt_ ? this
      : this.attachShadow({mode: 'open'})
  }

  get _ns_() { return imm_pxy_attr(this) }

  _render_(/* is_new */) {
    this._show_(
      this.render(this._ns_, this, this._tgt_) )
  }

  _bind_() {
    // bind ._show_ and ._refresh_ as closures
    return ({
      _refresh_: p => p && p.then
        ? p.then(this._refresh_)
        : this._render_(),

      _show_: node => {
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
      },
    })
  }
}

export default ImmElem


