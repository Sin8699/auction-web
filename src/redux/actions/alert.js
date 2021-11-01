export const actionTypesAlert = {
  OPEN_ALERT: 'OPEN_ALERT',
  CLOSE_ALERT: 'CLOSE_ALERT'
}

export const openAlert = data => ({
  type: actionTypesAlert.OPEN_ALERT,
  data
})

export const closeAlert = () => ({
  type: actionTypesAlert.CLOSE_ALERT
})
