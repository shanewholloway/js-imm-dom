import { _is_iter, _is_attrs } from './imm_utils.js'

const 
  _imm_h = (h_tag, h_lst) =>
    [... h_lst].reduceRight(_h_rr, h_tag),

  _h_rr = (h_tag, v, idx, h_lst) =>
    ! idx ? h_tag(... h_lst)
      : (_is_iter(v)
            ? h_lst[idx] = _imm_h(h_tag, v)
            : v
        , h_tag),

  _hafn = (attrs, match, op, value) => (
    '.' === op
      ? attrs.class = `${attrs.class||''} ${value}`
      : attrs.id = value // # === op
    , ''),

  _htag = h_tag => (... h_lst) => (
    // ensure [1] is an attribute dict
    _is_attrs(h_lst[1]) || h_lst.splice(1,0,{}),

    // replace tag name, #id, and .class
    h_lst[0] = h_lst[0].replaceAll(
      /\s*([.#])([^.#\s]*)\s*/g,
      _hafn.bind(0, h_lst[1])),

    // return our fixedup h_lst
    h_tag(... h_lst))

export { _htag, _imm_h }
