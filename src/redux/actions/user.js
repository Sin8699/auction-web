export const actionTypesUser = {
  REQUEST_PROFILE: 'REQUEST_PROFILE',
  SET_PROFILE: 'SET_PROFILE'
}

export const requestProfile = () => ({type: actionTypesUser.REQUEST_PROFILE})

export const setProfile = data => ({type: actionTypesUser.SET_PROFILE, data})
