import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { login } from '../core/_requests' // ⬅️ backend API call
import { useAuth } from '../core/Auth'

// ✅ Validation schema
const loginSchema = Yup.object().shape({
  userId: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(30, 'Maximum 30 characters')
    .required('User ID is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
})

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()

  const formik = useFormik({
    initialValues: {
      userId: 'samar6',
      password: 'Asdf@123',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setStatus(undefined)
      try {
          
    console.log('User ID:', values.userId)
    console.log('Password:', values.password)
      
        // Step 1: Call backend login API
        const { data: auth } = await login(values.userId, values.password)

  

        // Step 2: Save token + user info
        saveAuth(auth)            // usually stores JWT token
        setCurrentUser(auth.user) // set user profile data

      } catch (err) {
        console.error(err)
        setStatus(err?.response?.data?.message || 'Login failed')
        saveAuth(undefined)
      } finally {
        setLoading(false)
        setSubmitting(false)
      }
    },
  })

  return (
    <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          Use your User ID & Password
        </div>
      </div>

      {/* Error Message */}
      {formik.status && (
        <div className='mb-4 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* User ID Field */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900'>User ID</label>
        <input
          type='text'
          placeholder='Enter your User ID'
          autoComplete='off'
          {...formik.getFieldProps('userId')}
          className={clsx('form-control bg-transparent', {
            'is-invalid': formik.touched.userId && formik.errors.userId,
            'is-valid': formik.touched.userId && !formik.errors.userId,
          })}
        />
        {formik.touched.userId && formik.errors.userId && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.userId}</span>
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900'>Password</label>
        <input
          type='password'
          placeholder='Enter your password'
          {...formik.getFieldProps('password')}
          className={clsx('form-control bg-transparent', {
            'is-invalid': formik.touched.password && formik.errors.password,
            'is-valid': formik.touched.password && !formik.errors.password,
          })}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.password}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Login</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>

      {/* Signup Link */}
      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
