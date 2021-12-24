import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'



const LoginScreen = ({ location, history }) => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault() //dispatch login
    dispatch(login(email, password))
  }


  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" className="img-fluid" alt="Sample" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 justify-content-center">
              <h1>Sign In</h1>
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}

              <form onSubmit={submitHandler}>
                {/* Email input */}
                <div className="form-outline mb-4" controlId='email'>
                  <input type='email'
                    value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter a valid email address" />
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type='password'
                    value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{ padding: '15px 180px' }}>Login</button>
                  <Row className='py-3'>
                    <Col>
                      New Customer ?&#160;
                      <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register Now
                      </Link>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginScreen
