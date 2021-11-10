export const actionTypesUser = {
  REQUEST_PROFILE: 'REQUEST_PROFILE',
  SET_PROFILE: 'SET_PROFILE',
  REQUEST_LIST_USER_BY_ADMIN: 'REQUEST_LIST_USER_BY_ADMIN',
  SET_LIST_USER_FOR_ADMIN: 'SET_LIST_USER_FOR_ADMIN'
}

export const requestProfile = () => ({type: actionTypesUser.REQUEST_PROFILE})

export const setProfile = data => ({type: actionTypesUser.SET_PROFILE, data})

export const requestUsersByAdmin = () => ({type: actionTypesUser.REQUEST_LIST_USER_BY_ADMIN})

export const setListUserForAdmin = data => ({type: actionTypesUser.SET_LIST_USER_FOR_ADMIN, data})
