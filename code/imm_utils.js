export const
  _I_ = x=>x,
  _dash_name = s => s?.replace(/_/g, '-'),
  _prop_name = s => s?.replace(/-/g, '_'),
  _is_obj = a => 'object' === typeof a && null !== a,
  _is_iter = a => _is_obj(a) && Symbol.iterator in a,
  _is_attr_dict = a => _is_obj(a)
      && !a.nodeType && !a.toDOM
      && !_is_iter(a)

export const
  _imm_cp = (tgt, src, key) =>
    Object.assign(tgt, key ? {[key]:src} : src),
  _ce = /* #__PURE__ */ _I_(customElements),

  _el_on = (el, ...z) => ( el.addEventListener(...z), el ),
  _el_get = (el,k) => (k=el.getAttribute(k), ''==k || k),
  _el_has = (el,k) => el.hasAttribute(k),
  _el_set = (el,k,v) => (
    (null == v || false === v
      ? el.removeAttribute(k) // false or nullish is semantically removeAttribute()
      : _is_obj(v) == {style: 1}[k] ? _imm_cp(el[k], v) // use object assign for known keys: style; note true==1 but false!=undefined
      : el.setAttribute(k, true === v ? '' : v)
    ), 1)

