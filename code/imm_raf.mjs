export const imm_raf_sym =
  imm_raf.sym = Symbol.for('imm_raf')

let _raf_p=0, _raf_set = new Set()

export function imm_raf(obj) {
  if (null != obj)
    _raf_set.add(obj)

  if (0 === _raf_p)
    _raf_p = new Promise(requestAnimationFrame)
      .then(_raf_tick)
  return _raf_p
}

function _raf_tick() {
  let coll = [... _raf_set]
  _raf_set = new Set()
  _raf_p = 0

  coll.map(_raf_notify)
}

async function _raf_notify(obj) {
  obj[await imm_raf_sym](imm_raf) }

export default imm_raf
