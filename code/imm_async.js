
export function imm_defer_ctx(as_res=((...args) => args)) {
  let y,n,_pset = (a,b) => { y=a, n=b }
  return p => (p = new Promise(_pset), as_res(p, y, n))
}

export const imm_defer_v = /* #__PURE__ */
  imm_defer_ctx()

export const imm_defer = /* #__PURE__ */
  imm_defer_ctx((p,y,n) =>
    ({promise: p, resolve: y, reject: n}))

