import { _ce } from './imm_utils.mjs'
import { imm_defer_v  } from './imm_async.mjs'
import { imm_mixin } from './imm_elem_core.mjs'
import { imm_tag } from './imm_dom.mjs'

export const with_legacy = (base=HTMLElement) =>
  class extends base {
    static M = new Map()

    static import_src(opt) {
      let M = this.M, p = M.get(opt.src)
      if (!p)
        M.set(opt.src, p = this._import(opt))
      return p
    }

    static async _import({el, ...opt}) {
      let dp = imm_defer_v(),
        el_script = imm_tag('script',
          {...opt, load: dp[1], error: dp[2]})

      let p = el_script.ready =
        dp[0].then(opt.load, opt.error)
        .finally(() => el_script.remove())

      ;(el || document.head)
        .append(el_script)

      return await p
    }
  }

export function imm_legacy(opt) {
  let {tag, once, base} = opt.trim ? {tag:opt} : opt
  let klass = _ce.get(tag)
  if (! klass) {
    _ce.define(tag, klass=with_legacy(base))
    once && once(klass, tag)
  }
  return klass
}
