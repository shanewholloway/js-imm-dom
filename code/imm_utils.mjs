export const
  _dash_name = s => s.replace(/_/g, '-'),
  _prop_name = s => s.replace(/-/g, '_'),
  _is_obj = a => 'object' === typeof a && null !== a,
  _is_iter = a => _is_obj(a) && Symbol.iterator in a,
  _is_attr_dict = a => _is_obj(a)
      && !a.nodeType && !a.toDOM
      && !_is_iter(a)

export const
  _el_get = (el,k) => (k=el.getAttribute(k), ''==k || k),
  _el_has = (el,k) => el.hasAttribute(k),
  _el_set = (el,k,v) => (
    (null == v || false === v
      ? el.removeAttribute(k) // false or nullish is semantically removeAttribute()
      : el.setAttribute(k, true === v ? '' : v) // true indicates presence ('')
    ), 1)

// reducer compatible: Object.entries(ns).reduce(_elr_evt, el)
export const
  _elr_evt = (el,args) => (el.addEventListener(...args), el),
  _elr_devt = (el,[evt,fn]) => _elr_evt(el, [evt, e=>fn(e.detail)])
