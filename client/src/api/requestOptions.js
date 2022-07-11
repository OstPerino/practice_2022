/* eslint-disable */

export const backendUrl = 'http://localhost:4000'
export const queryParams = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include'
}
export const requestTemplate = {
  get() {
    return 'GET'
  },
  post() {
    return 'POST'
  },
  put() {
    return 'PUT'
  }
}
