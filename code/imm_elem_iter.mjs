import {ImmElem} from './imm_elem_core.mjs'

export class ImmIter extends ImmElem {
  disconnectedCallback() {
    this._greset_(true)
  }

  _render_(is_new) {
    let g = this._g_
    if (!g || is_new)
      g = this._greset_()

    this._gshow_(g.next())
  }

  _greset_(stop) {
    let g = this._g_
    if (g) g.return()
    return this._g_ = stop ? null
      : this.render(this._ns_, this, this._tgt_)
  }

  async _gshow_(tip) {
    if (tip.then)
      tip = await tip
    if (tip.done)
      this._g_ = null // reset next render
    return this._show_(tip.value)
  }
}
