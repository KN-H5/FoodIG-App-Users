import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';


// material ui core
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { db } from 'configs/firebaseConfig';
import "./styles.scss";
import "./CheckoutAside.scss";
function OrderTable() {

    const dataCheckOut = {
        country: "",
        dsc: "",
        id: "",
        img: "",
        name: "",
        price: "",
        qnt: "",
        rate: "",
    }
    const dataInfo = {
        name: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        day: '',
        time: '',
        id: '',
        statuss: '',
        totalPrice: '',
        discount:''

    }


    const { user } = useContext(AuthContext);
    const { displayName, email, photoURL } = user || '';
    const cartProducts = useSelector((state) => state.cart);

    const { wishlistProducts, isShowWishlist } = useSelector(
        (state) => state.wishlist
    );

    const queryCheckout = db.collection("checkout");
    const [checkOutData, setCheckOutData] = useState([dataCheckOut])

    const [infoData, setInfoData] = useState([dataInfo]);

    const [OrderInfo, setOrderInfo] = useState([])

    const OrderInfoData = (item) => {
        let data = [];
        let max = 0;
        for (let key in item) {
            if (max <= key) {
                max = key
            }

        }
        for (let key in item) {
            if (max !== 0 && key === max) {
                return data
            } else {
                let dataT = data
                data = item[key]
                data = dataT.concat(data)
            }

        }
        return data
    }

  
    const [totalQnt, setTotalQnt] = useState(0);
    const [wishlistQnt, setWishlistQnt] = useState(0);
    const [checkOutQnt, setCheckOutQnt] = useState(0);

    useEffect(() => {
        if (user) {
            queryCheckout
                .doc(user.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data().checkout;
                        const dataInfo = doc.data().info;

                        const totalQnt = data.reduce(
                            (accumulator, item) => data.length,
                            0
                        );
                        setCheckOutQnt(totalQnt)
                        setCheckOutData(data)
                        setInfoData(dataInfo)

                    }
                });
        }
    }, [user]);

    useEffect(() => {
        const totalQnt = cartProducts.reduce(
            (accumulator, item) => cartProducts.length,
            0
        );

        setTotalQnt(totalQnt);
    }, [cartProducts]);
    useEffect(() => {
        const wishlistQnt = wishlistProducts.reduce(
            (accumulator, item) => wishlistProducts.length,
            0
        );

        setWishlistQnt(wishlistQnt);
    }, [wishlistProducts]);

    return (
        <div className="container">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-3 my-lg-0 my-md-1">
                        <div id="sidebar" className="bg-purple">
                            <div className="h4 text-white">Account</div>
                            <ul>
                                <li >
                                    <div className="fas fa-box pt-2 me-3"></div>
                                    <div className="d-flex flex-column">
                                        <div className="link">My Account</div>
                                        <div className="link-desc">View & Manage orders and returns</div>
                                    </div>
                                </li>
                                <li className="active">
                                    <div className="fas fa-box-open pt-2 me-3"></div>
                                    <div className="d-flex flex-column">
                                        <div className="link">My Orders</div>
                                        <div className="link-desc">View & Manage orders and returns</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="far fa-address-book pt-2 me-3"></div>
                                    <div className="d-flex flex-column">
                                        <div className="link">My Address</div>
                                        <div className="link-desc">View & Manage Addresses</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="far fa-user pt-2 me-3"></div>
                                    <div className="d-flex flex-column">
                                        <div className="link">My Profile</div>
                                        <div className="link-desc">Change your profile details & password</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="fas fa-headset pt-2 me-3"></div>
                                    <div className="d-flex flex-column">
                                        <div className="link">Help & Support</div>
                                        <div className="link-desc">Contact Us for help and support</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 my-lg-0 my-1">
                        <div id="main-content" className="bg-white border">
                            <div className="d-flex flex-column">
                                <Avatar src={photoURL} alt='User' />
                                <span className='checkout-user-info__name'>{displayName}</span>
                                {email && (
                                    <span className='checkout-user-info__email'>({email})</span>
                                )}
                            </div>
                            <div className="d-flex my-4 flex-wrap">
                                <div className="box me-4 my-1 bg-light"> <img src="https://www.freepnglogos.com/uploads/box-png/cardboard-box-brown-vector-graphic-pixabay-2.png" alt="" />
                                    <div className="d-flex align-items-center mt-2">
                                        <div className="tag">Orders placed</div>
                                        <div className="ms-auto number">{checkOutQnt}</div>
                                    </div>
                                </div>
                                <div className="box me-4 my-1 bg-light"> <img src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-campus-recreation-university-nebraska-lincoln-30.png" alt="" />
                                    <div className="d-flex align-items-center mt-2">
                                        <div className="tag">Items in Cart</div>
                                        <div className="ms-auto number">{totalQnt}</div>
                                    </div>
                                </div>
                                <div className="box me-4 my-1 bg-light"> <img src="https://www.freepnglogos.com/uploads/love-png/love-png-heart-symbol-wikipedia-11.png" alt="" />
                                    <div className="d-flex align-items-center mt-2">
                                        <div className="tag">Wishlist</div>
                                        <div className="ms-auto number">{wishlistQnt}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-uppercase">My recent orders</div>
                            {checkOutData.map((item, index) => (
                                <div className="order my-3 bg-light">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="d-flex flex-column justify-content-between order-summary">
                                                <div className="d-flex align-items-center">
                                                    <div className="text-uppercase">Order #{item.id}</div>
                                                    <div className="blue-label ms-auto text-uppercase">paid</div>
                                                </div>
                                                {/* <div className="fs-8">Dish #03</div> */}
                                                {infoData.map((info, index) => (
                                                    info.id === item.id ?
                                                        <div className="fs-8">{info.day} | {info.time}</div>
                                                        : ''
                                                ))}
                                                <div className="rating d-flex align-items-center pt-1"> <img src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png" alt="" /><span className="px-2">Rating:</span> <span className="fas fa-star"></span> <span className="fas fa-star"></span> <span className="fas fa-star"></span> <span className="fas fa-star"></span> <span className="far fa-star"></span> </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                        {infoData.map((info, index) => (
                                            info.id === item.id ?
                                            <div>
                                            <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
                                                <div className="status">Status : Delivered</div>
                                                <div className="btn btn-primary text-uppercase">order info</div>
                                            </div>
                                            <div className="progressbar-track">
                                                <ul className="progressbar">
                                                    <li id="step-1" className="text-muted green"> <span className="fas fa-gift"></span> </li>
                                                    <li id="step-2" className={`text-muted ${info.statuss === "accepted" || info.statuss ==="packed" || info.statuss === "shipped" || info.statuss === "delivered" ?  'green': ''}`}><span className="fas fa-check"></span> </li>
                                                    <li id="step-3" className={`text-muted ${info.statuss ===  "packed" || info.statuss === "shipped" || info.statuss === "delivered"?  'green': ''}`}> <span className="fas fa-box"></span> </li>
                                                    <li id="step-4" className={`text-muted ${info.statuss === "shipped" || info.statuss === "delivered" ?  'green': ''}`}> <span className="fas fa-truck"></span> </li>
                                                    <li id="step-5" className={`text-muted ${info.statuss === "delivered" ?  'green': ''}`}> <span className="fas fa-box-open"></span> </li>
                                                </ul>
                                                <div id="tracker"></div>
                                            </div>
                                            </div>
                                                  : ''
                                                  ))}
                                        </div>
                                    </div>
                                    <ul className="checkout-products mt-3">
                                        {infoData.map((info, index) => (
                                            info.id === item.id ?
                                                <div className="mt-3">Phone: {info.phone} |Address: {info.address},{info.ward},{info.district},{info.city}</div>
                                                : ''
                                        ))}
                                        {OrderInfoData(item).map(({ id, name, img, qnt, country, price }) => (
                                            <li key={id} className="checkout-product">
                                                <div className="checkout-product__img">
                                                    <img src={img} alt="Checkout product" />
                                                    <span className="checkout-product__qnt">{qnt}</span>
                                                </div>
                                                <div className="checkout-product__content">
                                                    <h3 className="checkout-product__name">{name}</h3>
                                                    {/* <span className="checkout-product__country">{country}</span> */}
                                                </div>
                                                <span className="checkout-product__price">${price}</span>
                                            </li>

                                        ))}

                                    </ul>
                                    {infoData.map((info) => (
                                        info.id === item.id ?
                                            <div>
                                                <div className="checkout-detail__row">
                                                    <span className="checkout-detail__label">Discount</span>
                                                    <span className="checkout-detail__content">${info.discount}</span>
                                                </div>
                                                <div className="checkout-total">
                                                    <span className="checkout-total__label">Total</span>
                                                    <span className="checkout-total__price">${info.totalPrice}</span>
                                                </div>
                                            </div>
                                            : ''
                                    ))}
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OrderTable;
