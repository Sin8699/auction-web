const compareCategoryAndSub = (categories, subCategories) => {
  const tempSub = subCategories.map(sub => {
    const category = categories.find(cate => cate._id === sub.category)
    return {...sub, category: {name: category.name, id: category._id}}
  })

  const categoriesMap = new Map()
  tempSub.forEach(subCate => {
    let category = categoriesMap.get(`${subCate.category.id}`)

    if (!category) category = {...subCate.category, sub: [{name: subCate.name, id: subCate._id}]}
    else category.sub.push({name: subCate.name, id: subCate._id})
    categoriesMap.set(`${subCate.category.id}`, category)
  })
  return Array.from(categoriesMap.values())
}

export const getListCategories = (categories, subCategories) => {
  const subCate = compareCategoryAndSub(categories, subCategories)
  return categories.map(cate => {
    const listSub = subCate.find(sub => sub.name === cate.name)?.sub
    if (listSub) return {...cate, sub: listSub}
    return {...cate, sub: []}
  })
}
