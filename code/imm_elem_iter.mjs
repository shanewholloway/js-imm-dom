import {ImmElem} from './imm_elem_core.mjs'

export class ImmIter extends ImmElem {
  disconnectedCallback() { 
    let g = this._g_
    if (g) {
      this._g_ = null
      g.return()
    }
  }

  _render_(is_new) {
    let g = this._g_
    if (!g || is_new)
      this._g_ = g =
        this.render(this._ns_, this, this._tgt_)

    this._gshow_(g.next())
  }

  async _gshow_(tip) {
    if (tip.then)
      tip = await tip
    if (tip.done)
      this._g_ = null
    return this._show_(tip.value)
  }
}
