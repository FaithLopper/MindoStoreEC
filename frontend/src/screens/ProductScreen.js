import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, productReviewing } from '../actions/productActions.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'


function OptSizes(props) {
    const sizeOpts = props.data;
    const opt = sizeOpts.map((item) =>
        <option value={`${item.size}|${item.qty}`} >{item.size}</option>
    );
    return (opt);
}

const ProductScreen = ({ history, match }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const [countInStock, setCountInStock] = useState(0)
    const [qty, setQty] = useState(1)
    const [choseSize, setChoseSize] = useState(null)

    const productReview = useSelector((state) => state.productReview)
    const { success: reviewSuccess, loading: reviewsLoading, error: reviewError } = productReview

    useEffect(() => {
        if (reviewSuccess) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            dispatch({ type: PRODUCT_REVIEW_RESET })
        }

    }, [dispatch, match, reviewSuccess, product])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?size=${choseSize}&qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(productReviewing(match.params.id, { rating, comment }))
    }

    const changeOpt = (e) => {
        const sTr = e.target.value
        setChoseSize(Number(sTr.slice(0, sTr.indexOf("|"))))
        setCountInStock(Number(sTr.slice(sTr.indexOf("|") + 1)))
    }
    console.log(countInStock)
    return (
        <>
            <Link className='btn button-29 my-3' to='/'>Go Back</Link>
            {loading ? <Loader /> : error ? <Message variants='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{product.name}</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating}
                                        text={` ${product.numReviews} reviews`} />
                                </ListGroup.Item>

                                <ListGroup.Item >Price: ${product.price}</ListGroup.Item>
                                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>Price:</strong>
                                            </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>Status:</strong>
                                            </Col>
                                            <Col>
                                                <strong> {countInStock > 0 ? `${countInStock} In Stock` : countInStock === -1 ? 'Choose size' : 'Out of stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.allSize && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col><strong>Size:</strong></Col>
                                                <Col><select name="type" onChange={e => changeOpt(e)}>
                                                    <option value={'null|-1'}>...</option>
                                                    <OptSizes data={product.allSize} />
                                                </select></Col>
                                            </Row>
                                            <Row>
                                                <Col><strong>QTY:</strong></Col>
                                                <Col>
                                                    <input type="number" min="1" name="clicks" style={{ width: 120 }} value={qty}
                                                        onChange={event => setQty(Number(event.target.value))} />
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)}

                                    <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='button-63' type='button'
                                            disabled={countInStock === 0 || qty > countInStock}>Add to cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <h5>{review.name}</h5>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a review</h2>
                                    {reviewSuccess && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {reviewsLoading && <Loader />}
                                    {reviewError && (<Message variant='danger'>{reviewError.message}</Message>)}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button className='button-42'
                                                disabled={reviewsLoading}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>)
}

export default ProductScreen
