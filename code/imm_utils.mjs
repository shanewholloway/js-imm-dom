export const _dash_name = s => s.replace(/_/g, '-')

export const _is_attr_dict = a =>
  'object' === typeof a
    && null !== a
    && !a.nodeType
    && !a.toDOM
    && !Array.isArray(a)

