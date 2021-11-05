const LOCAL_STORAGE_KEY_FAVORED = 'favored_products'
export const handleFavoredProduct = productID => {
  try {
    const list = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_FAVORED)) || []

    let newList = []
    if (list.includes(productID)) {
      newList = list.filter(id => id !== productID)
    } else {
      newList = [...list, productID]
    }

    window.localStorage.setItem(LOCAL_STORAGE_KEY_FAVORED, JSON.stringify(newList))
  } catch (error) {
    console.error('error', error)
  }
}

export const isFavoredProduct = productID => {
  try {
    const list = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_FAVORED)) || []
    return list.includes(productID)
  } catch (error) {
    return false
  }
}
