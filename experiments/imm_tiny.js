const imm_tiny = (el, attr, ...z) =>
  z.flat(9).reduce(
    (el,c) => (el.append(c),el), // append children
    Object.assign(
      // create-or-use element
      el.nodeType ? el : document.createElement(el),
      attr // assign attributes
    ))

export default imm_tiny
