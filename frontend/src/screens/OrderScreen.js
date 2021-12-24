import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Tabs, Tab, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader.js'
import { getOrderDetails, processPayment } from '../actions/orderActions.js'
import { deliverOrder } from '../actions/adminActions'
import { ORDER_PAY_RESET, GET_PAYMENT_RESET } from '../constants/orderConstants'
import { ADMIN_DELIVERED_RESET } from '../constants/adminConstants'
import axios from 'axios'

const OrderScreen = ({ match }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderId = match.params.id
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const getPayment = useSelector(state => state.getPayment)
    const { res, loading: paymentLoading, success } = getPayment

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay } = orderPay

    const adminDelivered = useSelector((state) => state.adminDelivered)
    const { loading: loadingDeliver, success: successDeliver } = adminDelivered

    const [paymentKey, setPaymentKey] = useState({})
    const [exRate, setExRate] = useState(0)

    useEffect(() => {
        const getPaymentKey = async () => {
            const { data } = await axios.get('/api/config/paymentkey')
            setPaymentKey(data)
            return data
        }
        const getRate = async (key) => {
            const { data } = await axios.get(`https://api.exchangerate-api.com/v4/latest/${key.intCur}`)
            setExRate(data.rates.VND)

        }
        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ADMIN_DELIVERED_RESET })
            dispatch({ type: GET_PAYMENT_RESET })
            dispatch(getOrderDetails(orderId))
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                getPaymentKey().then(e => getRate(e))
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const [domNumber, setDomNumber] = useState('')
    const [domDate, setDomDate] = useState('')
    const [pin, setPin] = useState('')

    const domPay = (e) => {
        e.preventDefault()
        dispatch(processPayment(paymentKey, {
            type: 'domestic',
            cardNumber: domNumber,
            pinNumber: pin,
            expiredDate: domDate,
            currency: 'VND',
            amount: (order.totalPrice * exRate).toFixed(2)
        }, orderId))
        //console.log('thanh toan noi dia')
    }

    const [intNumber, setIntNumber] = useState('')
    const [intDate, setIntDate] = useState('')
    const [cvv, setCvv] = useState('')

    const intPay = (e) => {
        e.preventDefault()
        dispatch(processPayment(paymentKey, {
            type: 'international',
            cardNumber: intNumber,
            cvvNumber: cvv,
            expiredDate: intDate,
            currency: paymentKey.intCur,
            amount: order.totalPrice
        }, orderId))
        //console.log('thanh toan quoc te')
    }

    return loading ? (<Loader />)
        : error ? (<Message variant='danger'>{error}</Message>)
            : (<>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><div style={{ fontSize: '20px' }}>Name: {order.user.name} {order.user.email} </div></p>
                                <p>
                                    {order.isDelivered ? (<Message variant='success'>Paid on {order.deliveredAt}</Message>)
                                        : (<Message variant='danger'>Not Delivered</Message>)}
                                </p>
                                <div style={{ fontSize: '20px' }}>Address:&nbsp;
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <div style={{ fontSize: '20px' }}>Method:&nbsp;
                                    {order.paymentMethod}
                                </div>
                                {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}</Message>)
                                    : (<Message variant='danger'>NOT PAID</Message>)}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                    <ListGroup>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={2}>size: {item.size}</Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>{paymentKey.intCur} {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>{paymentKey.intCur} {order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>{paymentKey.intCur} {order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total in {paymentKey.intCur}</Col>
                                        <Col>{paymentKey.intCur} {order.totalPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Total in ~VNĐ</Col>
                                        <Col>{paymentKey.intCur} {order.totalPrice} x {exRate} = {(order.totalPrice * exRate).toFixed(2)} VNĐ</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        <Image width={250} className="nav-logo" src="/logo.png" alt="bank-logo" />

                                        <Tabs defaultActiveKey="Charge" id="uncontrolled-tab-example" className="mb-3">
                                            <Tab eventKey="domestic" title="Thẻ Nội Địa">
                                                <Form as={Col} className="mb-3" id="general_info">
                                                    <Row className="mb-3">
                                                        <Col>
                                                            <Form.Label style={{ fontWeight: "bold", fontSize: '20px' }}>Số thẻ</Form.Label>
                                                            <Form.Control value={domNumber} onChange={e => setDomNumber(e.target.value)} placeholder="số thẻ" />
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col>
                                                            <Form.Label style={{ fontWeight: "bold", fontSize: '20px' }}>Số PIN</Form.Label>
                                                            <Form.Control value={pin} type='password' onChange={e => setPin(e.target.value)} placeholder="số PIN" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label style={{ fontWeight: "bold", fontSize: '20px' }}>Ngày hết hạn</Form.Label>
                                                            <Form.Control value={domDate} onChange={e => setDomDate(e.target.value)} placeholder="Ngày hết hạng" />
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        type='submit'
                                                        className='btn btn-block'
                                                        onClick={domPay}> Thanh toán </Button>
                                                </Form>
                                            </Tab>
                                            <Tab eventKey="international" title="Thẻ Quốc Tế">
                                                <Form as={Col} className="mb-3" id="general_info">
                                                    <Row className="mb-3">
                                                        <Col>
                                                            <Form.Label style={{ fontWeight: "bold", fontSize: '20px' }}>Số thẻ</Form.Label>
                                                            <Form.Control value={intNumber} onChange={e => setIntNumber(e.target.value)} placeholder="số thẻ" />
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col>
                                                            <Form.Label style={{ fontWeight: "bold", fontSize: '20px' }}>Số CVV</Form.Label>
                                                            <Form.Control type='password' value={cvv} onChange={e => setCvv(e.target.value)} placeholder="số CVV" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label style={{ fontWeight: "bold", fontSize: '20px' }}>Ngày hết hạn</Form.Label>
                                                            <Form.Control value={intDate} onChange={e => setIntDate(e.target.value)} placeholder="Ngày hết hạng" />
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        type='submit'
                                                        className='btn btn-block'
                                                        onClick={intPay}> Thanh toán </Button>
                                                </Form>
                                            </Tab>
                                        </Tabs>
                                        {paymentLoading && <Loader />}
                                        {res && res.message ? <Alert variant='danger'> {res.message} </Alert>
                                            : res && success ? <Alert variant='success'>thanh toán thành công</Alert>
                                                : <></>}
                                    </ListGroup.Item>
                                )}

                                {loadingDeliver && <Loader />}
                                {userInfo &&
                                    userInfo.isAdmin &&
                                    order.isPaid &&
                                    !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={deliverHandler}
                                            >
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>)

}

export default OrderScreen
