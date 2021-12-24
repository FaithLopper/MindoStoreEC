import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile, userListAllOrders } from '../actions/userActions'



const ProfileScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error } = userUpdateProfile

    const userListOrders = useSelector(state => state.userListOrders)
    const { loading: loadingOrders, orders, error: errorOrders } = userListOrders


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [checkUpdate, setcheckUpdate] = useState(true)
    const [message, setMessage] = useState(null)


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(userListAllOrders())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault() //dispatch register
        if (password === "" || confirmPassword === "") {
            setMessage('Password is required to update')
        }
        else if (password !== confirmPassword) {
            setMessage('Password does not match')
        }
        else {
            dispatch(updateUserProfile({
                id: user._id, name, email, password, newPassword
            }))
            setMessage(success)
        }
    }

    const toggleUpdate = () => {
        setcheckUpdate(x => !x)
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' >
                        <Form.Label >Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' disabled={checkUpdate}
                            value={name} onChange={e => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' disabled={checkUpdate}
                            value={email} onChange={e => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' disabled={checkUpdate}
                            value={password} onChange={e => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmpassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter confirm password' disabled={checkUpdate}
                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='newpassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter new password' disabled={checkUpdate}
                            value={newPassword} onChange={e => setNewPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Button type='submit' variant='primary' disabled={checkUpdate} >Update</Button>
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" onChange={toggleUpdate} label="Check to Update" />
                        </Col>
                    </Row>

                </Form>
            </Col>

            <Col md={9}>
                <h2>My Order</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.slice(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.slice(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.slice(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>)
}

export default ProfileScreen
