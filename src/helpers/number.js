export function is_numeric(str) {
  return /^\d+$/.test(str)
}

export const numberWithCommas = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
