export const
  _dash_name = s => s?.replace(/_/g, '-'),
  _prop_name = s => s?.replace(/-/g, '_'),

  _is_obj = a => 'object' === typeof a && null !== a && !a.nodeType,
  _is_iter = a => _is_obj(a) && Symbol.iterator in a,
  _is_attr_dict = a => _is_obj(a) && !(a.toDOM || Symbol.iterator in a),

  _immt = (el,text='') => (el ? el.textContent=text : 0, el),
  _imm_el = el => el && (el.nodeType ? el : el[0]),
  _imm0 = el => (_immt(_imm_el(el)), el),
  _imm_cp = (tgt, src, key) =>
    key ? (tgt[key]=src, tgt)
        : Object.assign(tgt, src),

  _el_on = (el, evt, evt_fn, opt) =>
    el.addEventListener(evt, evt_fn, evt_fn.opt ?? opt),
  _el_off = (el, evt, evt_fn, opt) =>
    el.removeEventListener(evt, evt_fn, evt_fn.opt ?? opt),

  _el_get = (el,k) => (k=el.getAttribute(k), ''==k || k),
  _el_has = (el,k) => el.hasAttribute(k),
  _el_set = (el,k,v) => (
    (null == v || false === v
      ? el.removeAttribute(k) // false or nullish is semantically removeAttribute()
      : _is_obj(v) == {style: 1}[k] ? _imm_cp(el[k], v) // use object assign for known keys: style; note true==1 but false!=undefined
      : el.setAttribute(k, true === v ? '' : v)
    ), 1)

