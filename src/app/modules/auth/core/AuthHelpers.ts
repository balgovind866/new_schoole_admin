/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'

// Get the stored auth data from localStorage
const getAuth = (): AuthModel | undefined => {
  if (typeof localStorage === 'undefined') {
    return undefined
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return undefined
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    return auth || undefined
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    return undefined
  }
}

// Save auth data to localStorage
const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

// Remove auth data from localStorage
const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

// Setup Axios to include the Authorization header with token if available
export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'

  axios.interceptors.request.use(
    (config: any) => {
      const auth = getAuth() // Use getAuth to retrieve the full auth object

      // ✅ Adjust token extraction depending on AuthModel shape
      const token =
        auth?.token || // if your model stores token directly
        auth?.data?.token || // if token is inside data
        auth?.data?.data?.token // fallback for nested shape

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY }
