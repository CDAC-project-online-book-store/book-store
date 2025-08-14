import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Plus from "../../assets/icons/plus.svg?react";
import Minus from "../../assets/icons/minus.svg?react";
import api from "../../services/api";
import { createOrder } from "../../services/orderService";
import { getBookByIsbn } from "../../services/publicBookService";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [quantity, setQuantity] = useState(Number(state?.quantity) || 1);
  const [book, setBook] = useState(state?.book || null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const quantityBtnStyle = {
    background: "transparent",
    border: "none",
  };

  const roundedBtn = {
    borderRadius: "25px",
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const roleLower = (user?.role || 'UNREGISTERED').toLowerCase();
    if (!isLoggedIn || roleLower !== 'customer') {
      navigate('/login', { replace: true, state: { redirectTo: '/payment/checkout' } });
      return;
    }
    const init = async () => {
      // Ensure book is loaded
      if (!book) {
        if (state?.buyNow?.isbn) {
          try {
            const res = await getBookByIsbn(state.buyNow.isbn);
            setBook(res.data);
            if (state.buyNow.quantity) setQuantity(Number(state.buyNow.quantity));
          } catch (e) {
            navigate('/', { replace: true });
            return;
          }
        } else {
          // If page is refreshed without state, go back home
          navigate('/', { replace: true });
          return;
        }
      }
      // fetch addresses for user
      try {
        const res = await api.get(`/addresses/get`, { params: { userId: user.userId } });
        setAddresses(res.data || []);
        if ((res.data || []).length > 0) setSelectedAddressId(res.data[0].id);
      } catch (e) {
        setAddresses([]);
      }
    };
    init();
  }, [user, book, navigate]);

  const handleRemoveItem = () => {
    if (book?.isbn) {
      navigate(`/book/book-details/${book.isbn}`, { replace: true });
    } else {
      navigate(-1);
    }
  };

  const deliveryCharge = useMemo(() => {
    const options = [20, 40, 60];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  const itemsTotal = useMemo(() => (book ? (book.price || 0) * quantity : 0), [book, quantity]);
  const orderTotal = itemsTotal + deliveryCharge;

  const handleAddAddress = () => {
    navigate('/user/address', { state: { redirectTo: '/payment/checkout', returnToCheckout: true, fromCheckout: true, book, quantity } });
  };

  const handlePlaceOrder = async () => {
    if (!book) return;
    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }
    try {
      const payload = {
        userId: user.userId,
        addressId: selectedAddressId,
        bookId: book.id,
        orderItems: [
          { bookId: book.id, quantity, price: book.price }
        ],
        orderStatus: 'PENDING',
        totalAmount: orderTotal,
        deliveryCharge
      }; 
      await api.post('/order', payload);
      navigate('/payment/order-placed', { replace: true, state: { book, quantity, total: orderTotal } });
    } catch (e) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="container p-4 bg-white">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-8">
          {/* Item section */}
          {book && (
            <div className="d-flex border p-3 rounded mb-4" style={{ borderColor: "#38a3a5ff" }}>
              
              <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt="book" style={{ width: 100, height: 130, objectFit: "cover" }} onError={(e) => { e.currentTarget.src = "" }} />

              <div className="ms-3 d-flex flex-column justify-content-between flex-grow-1">
                <div>
                  <div className="fw-semibold">{book.title}</div>
                  <div className="fw-bold text-success">{book.price} rupees</div>
                </div>
                <button type="button" onClick={handleRemoveItem} className="btn btn-link text-danger text-decoration-none mt-2 p-0">Cancel</button>
              </div>

              <div className="d-flex flex-column align-items-end justify-content-between ms-3">
                <div className="d-flex align-items-center border rounded-pill px-2 py-1" style={{ borderColor: "#22577aff" }}>
                  <button className="btn p-0" onClick={decrease} style={quantityBtnStyle}>
                    <Minus width={20} height={20} />
                  </button>
                  <div className="px-2">{quantity}</div>
                  <button className="btn p-0" onClick={increase} style={quantityBtnStyle}>
                    <Plus width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Select a delivery address */}
          <div className="border p-3 rounded mb-4" style={{ borderColor: "#38a3a5ff" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Select a delivery address</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={handleAddAddress}>Add Address</button>
            </div>
            {addresses.length === 0 ? (
              <div className="text-muted">No addresses found. Please add one.</div>
            ) : (
              <div className="list-group">
                {addresses.map(addr => (
                  <div key={addr.id} className="list-group-item d-flex align-items-start justify-content-between">
                    <label className="d-flex align-items-start flex-grow-1" style={{cursor:'pointer'}}>
                      <input
                        className="form-check-input me-2 mt-1"
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <div>
                        <div className="fw-semibold">{addr.name} • {addr.phoneNumber}</div>
                        <div className="small text-muted">
                          {addr.addressLineOne}, {addr.addressLineTwo}, {addr.landMark}, {addr.city}, {addr.state} - {addr.pinCode}
                        </div>
                        <div className="badge bg-secondary mt-1">{addr.label}</div>
                      </div>
                    </label>
                    <button
                      className="btn btn-sm btn-outline-danger ms-3"
                      onClick={async () => {
                        try {
                          await api.delete(`/addresses/${addr.id}`, { params: { userId: user.id } });
                          const res = await api.get(`/addresses/get`, { params: { userId: user.id } });
                          setAddresses(res.data || []);
                          if (selectedAddressId === addr.id) {
                            setSelectedAddressId(res.data?.[0]?.id || null);
                          }
                        } catch (e) {
                          const data = e?.response?.data;
                          const msg = (typeof data === 'string') ? data : (data?.message || 'Failed to remove address');
                          alert(msg);
                        }
                      }}
                    >
                      Remove Address
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment method */}
          <div className="border p-3 rounded mb-4" style={{ borderColor: "#38a3a5ff" }}>
            <h5 className="mb-0">Payment method</h5>
            <div className="mt-2">Credits available</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4 ps-md-4">
          <div className="border p-3 rounded" style={{ backgroundColor: "#f9f9f9", borderColor: "#c7f9ccff" }}>
            <h5>Total</h5>
            <hr />
            <div className="fw-semibold mb-2">Items: {itemsTotal} rupees</div>
            <div className="fw-semibold mb-2">Delivery: {deliveryCharge} rupees</div>
            <div className="fw-bold fs-5">Order Total: {orderTotal} rupees</div>
            <button
              className="btn w-100 mt-3 text-white fw-semibold"
              style={{ ...roundedBtn, backgroundColor: "#57cc99ff" }}
              onClick={handlePlaceOrder}
              disabled={!book}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
