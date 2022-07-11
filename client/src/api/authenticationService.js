function login(username, password) {
  return fetch()
    .then(response => {
      return response.json()
    })
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user))
      return user
    })
}
