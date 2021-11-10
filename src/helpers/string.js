export const hide = str => {
  let newString = ''
  for (let i = 0; i < str.length; i++) {
    if (i < str.length / 2) newString += '*'
    else newString += str[i]
  }
  return newString
}
