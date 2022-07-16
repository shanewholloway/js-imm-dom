import { _is_attr_dict } from './imm_utils.mjs'
import { imm_tag } from './imm_dom.mjs'
import { imm_htag } from './imm_htag.mjs'


const
  _h_id = (s,a) => a.id = s,
  _h_cls = (s,a) => a.class = [a.class,s].join(' '),
  _h_reify = h_tag => (... h_lst) => (
    // ensure [1] is an attribute dict
    _is_attr_dict(h_lst[1]) || h_lst.splice(1,0,{}),

    // split out #id and .class
    h_lst[0]
      .split(/\s*([.#])([^.# ]*)\s*/)
      .reduce(
        (op, s, i, l) => (
          !s ? op :
          '#'==s ? _h_id :
          '.'==s ? _h_cls :
          op(s, h_lst[1])),

        s => h_lst[0] = s),

    // return our fixedup h_lst
    h_tag?.(... h_lst) ?? h_lst)


export const imm_h = /* #__PURE__ */
  imm_htag(_h_reify(imm_tag))

export { imm_tag, imm_h as default }

