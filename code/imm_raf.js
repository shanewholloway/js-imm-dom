export const imm_raf_sym =
  imm_raf.sym = Symbol.for('imm_raf')

let _raf_p=0, _raf_map = new Map()
const _raf_notify = ([obj, x]) =>
  obj[imm_raf_sym]?.(imm_raf, x)


export function imm_raf(obj, x) {
  if (null != obj && !_raf_map.has(obj))
    _raf_map.set(obj, x)

  if (0 === _raf_p)
    _raf_p = new Promise(requestAnimationFrame)
      .then(_raf_tick)
  return _raf_p
}

function _raf_tick() {
  let coll = [... _raf_map.entries()]
  _raf_map = new Map()
  _raf_p = 0

  coll.forEach(_raf_notify)
}

export default imm_raf
