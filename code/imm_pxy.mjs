import {_dash_name} from './_imm_utils.mjs'

const _imm_pxy = {
  get(tag_fn, key, ns) {
    let r = tag_fn[key]
    if (undefined === r && /[a-z]/.test(key))
      ns[key] = r = tag_fn
        .bind(null, _dash_name(key))
    return r }}

export const imm_pxy = (tag_fn, kw=tag_fn) =>
  ({ __proto__: new Proxy(tag_fn, _imm_pxy), ... kw })

export default imm_pxy
