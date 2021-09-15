getAuthUser({ commit, getters }) {
            const authUser = getters['authUser']
            const token = localStorage.getItem('jwt-token')
            const isTokenValid = checkTokenValidity(token)
            if (authUser && isTokenValid) {
                return Promise.resolve(authUser)
            }

            const config = {
                headers: {
                    'cache-control': 'no-cache',
                    'Authorization': token
                }
            }
            return axios('/api/v1/users/me', config)
                .then((res) => {
                    const user = res.user
                    localStorage.setItem('jwt-token', user.token)
                    commit('setAuthUser', user)
                    commit('setAuthState', true)
                    return user
                })
                .catch(err => {
                    commit('setAuthUser', null)
                    return undefined
                })
        }