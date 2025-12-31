import {imm_emit} from './imm_evt_core.js'
import {imm_html, imm} from './dom/imm_dom.js'

// #__NO_SIDE_EFFECTS__
export function imm_dialog_ctx(evt_name='resolve-dialog') {
  return {
    emit: (e, detail) => imm_emit(e.target || e, evt_name, detail),

    async showModal(el_tgt, el_body) {
      let dp = Promise.withResolvers()
      let close = evt => {
        evt.stopPropagation()
        dp.resolve(evt)
      }

      let el_dialog = imm_html.dialog(
        {close, [evt_name]: close}, el_body)

      imm(el_tgt, el_dialog)
      el_dialog.showModal()

      let ans = await dp.promise
      el_dialog.remove()
      return ans.type == evt_name ? ans.detail : null
    }
  }
}

export const imm_dialog = imm_dialog_ctx()
