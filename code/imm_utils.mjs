export const _dash_name = s => s.replace(/_/g, '-')

export const _is_attr_dict = a =>
  'object' === typeof a
    && null !== a
    && !a.nodeType
    && !a.toDOM
    && !Array.isArray(a)

export const
  _el_get = (el,k) => (k=el.getAttribute(k), ''==k || k),
  _el_has = (el,k) => el.hasAttribute(k),
  _el_set = (el,k,v) => (el.setAttribute(k,v), 1),
  _el_rm = (el,k) => (el.removeAttribute(k), 1),
  _el_evt = (el,...args) => el.addEventListener(...args)
