export const call = (data, ...props) =>
  typeof data === 'function' ? data(...props) : data

export const ifExpression = (onTrue, onFalse, expressionFieldName) => props =>
  props[expressionFieldName] ? call(onTrue, props) : call(onFalse, props)

export const ifFirst = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'isFirst')

export const ifDisabled = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'disabled')

export const ifError = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'error')

export const ifSelected = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'isSelected')

export const validate = ({
  title,
  description,
  price,
  minCount,
  measurement,
  categoryId,
  discount,
  count,
}) => {
  const errors = {}

  if (!title) {
    errors.title = 'Вы не ввели название'
  }
  if (!description) {
    errors.description = 'Вы не ввели описание'
  }
  if (!price) {
    errors.price = 'Вы не ввели цену'
  }
  if (!minCount) {
    errors.minCount = 'Вы не ввели минимальное количество'
  }
  if (!measurement) {
    errors.measurement = 'Вы не выбрали единицу измерения'
  }
  if (!categoryId) {
    errors.categoryId = 'Вы не выбрали подкатегорию'
  }

  if (!count) {
    errors.count = 'Укажите количество на складе'
  }

  if (Number(discount) > Number(price)) {
    errors.discount = 'Плохая скидка'
  }
  return errors
}

export const createBody = ({
  id,
  title,
  description,
  categoryId,
  price,
  discount,
  measurement,
  minCount,
  count,
  deletedPhotos,
  files,
}) => {
  const body = new FormData()

  files && files.forEach(file => body.append('files', file))
  deletedPhotos &&
    deletedPhotos.forEach(photo => {
      body.append('fileIdsToDelete', photo)
    })
  body.append(
    'orderDescription',
    `Минимальный заказ составляет ${minCount || 0} ${measurement}.`,
  )
  body.append('title', title)
  body.append('description', description)
  body.append('price', Number(price).toString())
  body.append('measurement', measurement)
  body.append('categoryId', categoryId)
  body.append('minCount', minCount)
  discount && body.append('discount', Number(discount).toString())
  id && body.append('id', id)
  body.append('count', count)

  return body
}

export const destructById = (array, field = 'id') =>
  !array || array.length === 0
    ? {}
    : array.reduce(
        (prev, current) => ({
          ...prev,
          [current[field]]: current,
          ...destructById(current.subcategories),
        }),
        {},
      )

export const getPercent = (ideal, value) =>
  value ? 100 - Math.round((value * 100) / ideal) : 0
