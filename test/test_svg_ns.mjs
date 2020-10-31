
import {imm_svg} from './esm/imm_dom_ns.mjs'

let d = imm_svg.svg(
    {class:'chart',
     viewBox:'-10 10 80 120'},

  imm_svg.polyline({
    fill: 'none',
    stroke: '#0074d9',
    stroke_width: '3',
    points: '0,120 20,60 40,80 60,20' }))

