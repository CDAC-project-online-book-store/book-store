import Book1 from "../../assets/book covers/Book1.jpeg";
import Book2 from "../../assets/book covers/Book2.jpeg";
import Book3 from "../../assets/book covers/Book3.jpeg";

function CartItem({ image, title, author, quantity, price }) {
    return (
        <div className="d-flex align-items-center p-2 pe-4 ps-4 mb-3"
            style={{
                height: "220px",
                gap: "1rem",
                border: "1px solid #38a3a5ff",
                borderRadius: "25px"
            }}>
            {/* Image */}
            <div style={{ width: "110px", height: "180px", backgroundColor: "red" }}>
                <img
                    src={image}
                    alt="Book cover"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            {/* Details */}
            <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
                <div>
                    <div className="fs-3">{title}</div>
                    <div className="ms-1 pt-1 fs-5">by {author}</div>
                    <div className="fs-6 fw-bold ps-1">Paperback</div>
                    <div className="ms-1 pt-1 fs-6" style={{ color: "#22577aff" }}>
                        Delivered
                    </div>
                </div>
                <div>{quantity}</div>
            </div>

            {/* Price */}
            <div>
                <div className="fs-4 fw-semibold">{price}</div>
                <div>Subtotal</div>
            </div>
        </div>
    );
}

function OrderHistory() {
    return (
        <div className="container-xl">
            <h2>Order History</h2>
            <div className="text-muted ps-1 pb-2">
                Delivered to: 302, Maple Residency, Hadosiddhapura, Sarjapur Road, Bangalore
            </div>
            <div className="d-flex flex-row-reverse pe-2 fw-semibold">Price (Rupees)</div>
            <hr />

            <CartItem image={Book1} title="The sum of all things" author="Nicole Brooks" quantity={3} price={690} />
            <CartItem image={Book2} title="Never ending sky" author="Joseph Kirkland" quantity={3} price={690} />
            <CartItem image={Book3} title="Soul" author="Olivia Wilson" quantity={3} price={690} />
        </div>
    );
}

export default OrderHistory;


// import Book1 from "../../assets/book covers/Book1.jpeg";
// import Book2 from "../../assets/book covers/Book2.jpeg";
// import Book3 from "../../assets/book covers/Book3.jpeg";


// function CartItem({ image, title, author, quantity, price }) {
//     return (
//         <div className="d-flex align-items-center p-2 pe-4 ps-4 mb-3"
//             style={{
//                 height: "220px",
//                 gap: "1rem",
//                 border: "1px solid #38a3a5ff",
//                 borderRadius: "25px"
//             }}>
//             {/* Image */}
//             <div style={{ width: "110px", height: "180px", backgroundColor: "red" }}>
//                 <img
//                     src={image}
//                     alt="Book cover"
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//             </div>

//             {/* Details */}
//             <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
//                 <div>
//                     <div className="fs-3">{title}</div>
//                     <div className="ms-1 pt-1 fs-5">by {author}</div>
//                     <div className="fs-6 fw-bold ps-1">Paperback</div>
//                     <div className="ms-1 pt-1 fs-6" style={{ color: "#22577aff" }}>
//                         Delivered
//                     </div>
//                 </div>
//                 <div>{quantity}</div>
//             </div>

//             {/* Price */}
//             <div>
//                 <div className="fs-4 fw-semibold">{price}</div>
//                 <div>Subtotal</div>
//             </div>
//         </div>
//     );
// }

// function OrderHistory() {
//     const proceedToCheckout = () => {
//         alert("Proceeding to checkout...");
//     };

//     return (
//         <div className="d-flex">
//             <div className="container-xl" style={{ width: "70%" }}>
//                 <h2>Order History</h2>
//                 <div className="d-flex flex-row-reverse pe-2 fw-semibold">Price (Rupees)</div>
//                 <hr />

//                 <CartItem image={Book1} title="The sum of all things" author="Nicole Brooks" quantity={3} price={690} />
//                 <CartItem image={Book2} title="Never ending sky" author="Joseph Kirkland" quantity={3} price={690} />
//                 <CartItem image={Book3} title="Soul" author="Olivia Wilson" quantity={3} price={690} />

//             </div>

//             <div className="mt-5 ms-4" style={{ minWidth: "250px", maxWidth: "300px", paddingRight: "20px" }}>
//                 <h4>Total</h4>
//                 <hr />
//                 <div className="fs-6 fw-semibold">(9 item): 2070 rupees</div>
//                 <div className="mt-3">
//                     <button
//                         type="button"
//                         className="btn fw-semibold"
//                         style={{
//                             borderRadius: "25px",
//                             borderColor: "#57cc99ff",
//                             backgroundColor: "#57cc99ff",
//                             color: "white"
//                         }}
//                         onClick={proceedToCheckout}
//                     >
//                         Proceed to checkout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default OrderHistory;
