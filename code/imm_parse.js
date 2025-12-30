
// #__NO_SIDE_EFFECTS__
export const imm_parse = src =>
  new DOMParser().parseFromString('<!DOCTYPE html>'+src, 'text/html')
