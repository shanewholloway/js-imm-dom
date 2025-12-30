import { imm_mixin } from './imm_elem_core.js'
import { imm_tag } from '../dom/imm_dom.js'

// #__NO_SIDE_EFFECTS__
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
      let dp = Promise.withResolvers(),
        el_script = imm_tag('script',
          {...opt, load: dp.resolve, error: dp.reject})

      let p = el_script.ready =
        dp.promise.then(opt.load, opt.error)
        .finally(() => el_script.remove())

      ;(el || document.head)
        .append(el_script)

      return await p
    }
  }

export function imm_legacy(opt) {
  let {tag, once, base} = opt.trim ? {tag:opt} : opt
  let klass = customElements.get(tag)
  if (! klass) {
    customElements.define(tag, klass=with_legacy(base))
    once && once(klass, tag)
  }
  return klass
}
