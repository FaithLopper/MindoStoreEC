import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Card, Image } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {

    const dispatch = useDispatch()

    const productId = match.params.id

    const curURL = location.search
    const size = new URLSearchParams(curURL).get('size');
    const qty = new URLSearchParams(curURL).get('qty');


    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, size, qty))
        }
    }, [dispatch, productId, qty, size])


    const removeFromCartHandler = (dId, dSize) => {
        dispatch(removeFromCart(dId, dSize))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0
                        ? (<Message>Your cart is empty&nbsp;
                            <Link to='/'>Go back
                            </Link></Message>)
                        : (<ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={2}>
                                            <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>size: {item.size}</Col>

                                        <Col md={2}>${item.price}</Col>

                                        <Col md={2}>
                                            <input type="number" min="1" name="clicks" style={{ width: 120 }} value={item.qty} disabled={true} />
                                        </Col>

                                        <Col md={1}>
                                            <Button type='button' variant='light'
                                                onClick={() => removeFromCartHandler(item.product, item.size)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>)}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)} Items</h2>
                            <h4>TOTAL: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item type='button' className='btn-block' disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >Proceed to checkout</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
