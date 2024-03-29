import {imm_emit, imm_defer_v} from './imm_evt.js'
import {imm_tag, imm} from './imm_dom.js'

export function imm_dialog_ctx(evt_name='resolve-dialog') {
  return {
    emit: (e, detail) => imm_emit(e.target || e, evt_name, detail),

    async showModal(el_tgt, el_body) {
      let [ans, done] = imm_defer_v()
      let close = evt => {
        evt.stopPropagation()
        done(evt)
      }

      let el_dialog = imm_tag('dialog',
        {close, [evt_name]: close}, el_body)

      imm(el_tgt, el_dialog)
      el_dialog.showModal()

      ans = await ans
      el_dialog.remove()
      return ans.type == evt_name ? ans.detail : null
    }
  }
}

export const imm_dialog = /* #__PURE__ */
  imm_dialog_ctx()
