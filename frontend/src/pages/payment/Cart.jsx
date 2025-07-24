import Book1 from "../../assets/book covers/Book1.jpeg";
import Book2 from "../../assets/book covers/Book2.jpeg";
import Book3 from "../../assets/book covers/Book3.jpeg";
import Plus from '../../assets/icons/plus.svg?react'
import Minus from '../../assets/icons/minus.svg?react'
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();

    const proceedToCheckout = () => {
        navigate('/payment/checkout')
    }

    return (
        <div className="d-flex">
            <div className="container-xl" style={{width:"70%"}}>
                <h2>Shopping Cart</h2>

                <div className="d-flex flex-row-reverse pe-2 fw-semibold">Price (Rupees)</div>
                <hr />


                <div className="d-flex align-items-center p-2 pe-4 ps-4" style={{ height: "220px", gap: "1rem", border: "1px solid #38a3a5ff", borderRadius: "25px" }}>
                    {/* Image */}
                    <div style={{ width: "110px", height: "180px", backgroundColor: "red" }}>
                        <img
                            src={Book1}
                            alt="Book cover"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
                        <div>
                            <div className="fs-3">The sum of all things</div>
                            <div className="ms-1 pt-1 fs-5">by Nicole Brooks</div>
                            <div className="fs-6 fw-bold ps-1">Paperback</div>
                            <div className="ms-1 pt-1 fs-6" style={{ color: "#22577aff" }}>
                                in stock
                            </div>
                        </div>

                        <div className="d-flex gap-2 pt-1 pb-1 " style={{ border: "1px solid #38a3a5ff", borderRadius: "25px", width: "100px" }}>
                            <button type="button" aria-label="Remove one" style={{ background: "transparent", border: "none" }} >
                                <Minus fill="none" width={25} height={25} />
                            </button>
                            <div>3</div>
                            <button type="button" aria-label="Add one" style={{ background: "transparent", border: "none" }} >
                                <Plus fill="none" width={25} height={25} />
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <div className="fs-4 fw-semibold">690</div>
                        <div>Subtotal</div>
                    </div>
                </div>
                <br />

                <div className="d-flex align-items-center p-2 pe-4 ps-4" style={{ height: "220px", gap: "1rem", border: "1px solid #38a3a5ff", borderRadius: "25px" }}>
                    {/* Image */}
                    <div style={{ width: "110px", height: "180px", backgroundColor: "red" }}>
                        <img
                            src={Book2}
                            alt="Book cover"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
                        <div>
                            <div className="fs-3">Never ending sky</div>
                            <div className="ms-1 pt-1 fs-5">by Joseph Kirkland</div>
                            <div className="fs-6 fw-bold ps-1">Paperback</div>
                            <div className="ms-1 pt-1 fs-6" style={{ color: "#22577aff" }}>
                                in stock
                            </div>
                        </div>

                        <div className="d-flex gap-2 pt-1 pb-1 " style={{ border: "1px solid #38a3a5ff", borderRadius: "25px", width: "100px" }}>
                            <button type="button" aria-label="Remove one" style={{ background: "transparent", border: "none" }} >
                                <Minus fill="none" width={25} height={25} />
                            </button>
                            <div>3</div>
                            <button type="button" aria-label="Add one" style={{ background: "transparent", border: "none" }} >
                                <Plus fill="none" width={25} height={25} />
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <div className="fs-4 fw-semibold">690</div>
                        <div>Subtotal</div>
                    </div>
                </div>
                <br />

                <div className="d-flex align-items-center p-2 pe-4 ps-4" style={{ height: "220px", gap: "1rem", border: "1px solid #38a3a5ff", borderRadius: "25px" }}>
                    {/* Image */}
                    <div style={{ width: "110px", height: "180px", backgroundColor: "red" }}>
                        <img
                            src={Book3}
                            alt="Book cover"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
                        <div>
                            <div className="fs-3">Soul</div>
                            <div className="ms-1 pt-1 fs-5">by Olivia Wilson</div>
                            <div className="fs-6 fw-bold ps-1">Paperback</div>
                            <div className="ms-1 pt-1 fs-6" style={{ color: "#22577aff" }}>
                                in stock
                            </div>
                        </div>

                        <div className="d-flex gap-2 pt-1 pb-1 " style={{ border: "1px solid #38a3a5ff", borderRadius: "25px", width: "100px" }}>
                            <button type="button" aria-label="Remove one" style={{ background: "transparent", border: "none" }} >
                                <Minus fill="none" width={25} height={25} />
                            </button>
                            <div>3</div>
                            <button type="button" aria-label="Add one" style={{ background: "transparent", border: "none" }} >
                                <Plus fill="none" width={25} height={25} />
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <div className="fs-4 fw-semibold">690</div>
                        <div>Subtotal</div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ms-4" style={{ minWidth: "250px", maxWidth: "300px", paddingRight:"20px"}}>

            {/* <div className="mt-5 me-4" style={{marginRight:"400px"}} > */}
                <h4>Total</h4>
                <hr />
                <div className="fs-6w fw-semibold">(9 item):2070 rupees</div>
                <div >
                    <button type="button" className="btn btn-warning fw-semibold" style={{ borderRadius: "25px", borderColor: "#57cc99ff", backgroundColor: "#57cc99ff", color: "white" }} onClick={proceedToCheckout}>Proceed to checkout</button>
                </div>
            </div>
        </div>

    );
}

export default Cart;