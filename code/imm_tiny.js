export default (el, attr, ...z) =>
  z.reduce(
    (el,c) => (el.append(c),el), // append children
    Object.assign(
      // create-or-use element
      el.nodeType ? el : document.createElement(el),
      attr // assign attributes
    ))
