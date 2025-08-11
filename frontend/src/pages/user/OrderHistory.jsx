import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import { getOrdersByUser, updateOrderStatus } from '../../services/orderService';
import { getBookById } from '../../services/bookService';
import { useNavigate } from 'react-router-dom';

function CartItem({ order, onCancel, onAddReview, onUpdateReview }) {
    const navigate = useNavigate();
    const firstItem = order.orderItems?.[0];
    const [book, setBook] = useState(null);
    const bookId = order.bookId || firstItem?.bookId;

    useEffect(() => {
        if (bookId) {
            getBookById(bookId).then(res => setBook(res.data)).catch(() => setBook(null));
        }
    }, [bookId]);

    return (
        <div className="d-flex align-items-center p-2 pe-4 ps-4 mb-3"
            style={{
                height: "220px",
                gap: "1rem",
                border: "1px solid #38a3a5ff",
                borderRadius: "25px"
            }}>
            <div style={{ width: "110px", height: "180px", backgroundColor: "#f5f5f5", cursor: 'pointer' }} onClick={() => book?.isbn && navigate(`/book/book-details/${book.isbn}`)}>
                {book?.isbn && (
                    <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                        alt="Book cover"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                )}
            </div>

            <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
                <div>
                    <div className="fs-4">{book?.title || `Order #${order.id}`}</div>
                    <div className="ms-1 pt-1 fs-6" style={{ color: "#22577aff" }}>
                        {order.orderStatus}
                    </div>
                </div>
                <div>Qty: {firstItem?.quantity || 1}</div>
                <div className="d-flex gap-2 mt-2">
                    {order.orderStatus === 'PENDING' && (
                        <button className="btn btn-outline-danger btn-sm" onClick={() => onCancel(order.id)}>Cancel</button>
                    )}
                    {order.orderStatus === 'DELIVERED' && (
                        <>
                            <button className="btn btn-outline-primary btn-sm" onClick={() => onAddReview(order)}>Add Review</button>
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => onUpdateReview(order)}>Update Review</button>
                        </>
                    )}
                </div>
            </div>

            <div>
                <div className="fs-4 fw-semibold">{(order.totalAmount ?? 0) + (order.deliveryCharge ?? 0)}</div>
                <div>Order Total</div>
            </div>
        </div>
    );
}

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.id) { setOrders([]); return; }
        const res = await getOrdersByUser(user.id);
        setOrders(res.data || []);
      } catch (e) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'CANCELLED');
      const res = await getOrdersByUser(user.id);
      setOrders(res.data || []);
    } catch (e) {
      alert('Failed to cancel order');
    }
  };

  const handleAddReview = (order) => {
    const bookId = order.bookId || order.orderItems?.[0]?.bookId;
    if (!bookId) return;
    navigate('/user/add-review', { state: { bookId } });
  };

  const handleUpdateReview = (order) => {
    const bookId = order.bookId || order.orderItems?.[0]?.bookId;
    if (!bookId) return;
    navigate('/user/add-review', { state: { bookId, update: true } });
  };

  return (
    <div className="container-xl">
      <h2>Order History</h2>
      <div className="d-flex flex-row-reverse pe-2 fw-semibold">Price (Rupees)</div>
      <hr />
      {orders.length === 0 && <div className="text-muted">No orders yet.</div>}
      {orders.map((order) => (
        <CartItem
          key={order.id}
          order={order}
          onCancel={handleCancel}
          onAddReview={handleAddReview}
          onUpdateReview={handleUpdateReview}
        />
      ))}
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

