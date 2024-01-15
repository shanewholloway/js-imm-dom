
export const
  imm_parse = src =>
    new DOMParser()
      .parseFromString('<!DOCTYPE html>'+src, 'text/html')
