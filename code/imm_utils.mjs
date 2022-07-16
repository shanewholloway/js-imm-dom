export const
  _dash_name = s => s?.replace(/_/g, '-'),
  _prop_name = s => s?.replace(/-/g, '_'),
  _pairs = o => Object.entries(o),
  _is_obj = a => 'object' === typeof a && null !== a,
  _is_iter = a => _is_obj(a) && Symbol.iterator in a,
  _is_attr_dict = a => _is_obj(a)
      && !a.nodeType && !a.toDOM
      && !_is_iter(a)

const
  _arv_style = (s,[k,v]) => `${s}${_dash_name(k)}: ${v};`,
  _av = (k, v) =>
    true === v ? '' // true indicates presence ('')
    : v.trim ? v // string -- use it
    : 'style' === k ? _pairs(v).reduce(_arv_style,'') // style object to CSS source
    : v

export const
  _el_on = (el, ...z) => ( el.addEventListener(...z), el ),
  _el_get = (el,k) => (k=el.getAttribute(k), ''==k || k),
  _el_has = (el,k) => el.hasAttribute(k),
  _el_set = (el,k,v) => (
    (null == v || false === v
      ? el.removeAttribute(k) // false or nullish is semantically removeAttribute()
      : el.setAttribute(k, _av(k,v))
    ), 1)

