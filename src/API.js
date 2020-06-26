const URL = ''

export const ENDPOINTS = {
  ORDERS: () => `${URL}/api/v1/orders`,
  DRIVERS: () => `${URL}/api/v1/drivers`,
  LOGIN: () => `${URL}/api/v1/admin/login`,
  CATEGORIES: () => `${URL}/api/v1/categories`,
  SUBCATEGORY: () => `${URL}/api/v1/subcategory`,
  PRODUCTS: filters => `${URL}/api/v1/products${filters ? '?' + filters : ''}`,
  PRODUCT: id => `${URL}/api/v1/products/${id}`,
  USERS: filters => `${URL}/api/v1/users${filters ? '?' + filters : ''}`,
  TOGGLE_DISABLED_PRODUCT: id => `${URL}/api/v1/products/${id}/toggleDisabled`,
  PROMOTIONS: id => `${URL}/api/v1/promotions${id ? `/${id}` : ''}`,
  SET_USER_STATUS: (userId, status) =>
    `${URL}/api/v1/users/${userId}/${status}`,
}
