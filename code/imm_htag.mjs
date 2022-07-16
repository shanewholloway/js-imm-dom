import { _is_iter } from './imm_utils.mjs'

const 
  _imm_h = (h_tag, h_lst) =>
    [... h_lst].reduceRight(_h_rr, h_tag),

  _h_rr = (h_tag, v, idx, h_lst) =>
    ! idx ? h_tag(... h_lst)
      : (_is_iter(v)
            ? h_lst[idx] = _imm_h(h_tag, v)
            : v
        , h_tag)

export const imm_htag = h_tag =>
  h_lst => _imm_h(h_tag, h_lst)

export {imm_htag as default}
