# Immediate Utility API

- `imm_raf(obj) : Promise`

  Returns a promise that will be fulfilled on the next `requestAnimationFrame` callback.
  Schedules `obj[imm_raf_sym](imm_raf)` to be called when the promise is fulfilled,
  allowing for update batching.

