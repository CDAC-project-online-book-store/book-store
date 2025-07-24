import { useState } from "react";
import Book1 from "../../assets/book covers/Book1.jpeg";
import Plus from "../../assets/icons/plus.svg?react";
import Minus from "../../assets/icons/minus.svg?react";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const quantityBtnStyle = {
    background: "transparent",
    border: "none",
  };

  const roundedBtn = {
    borderRadius: "25px",
  };

  return (
    <div className="container p-4 bg-white">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-8">
          <div className="d-flex border p-3 rounded mb-4" style={{ borderColor: "#38a3a5ff" }}>
            <img src={Book1} alt="book" style={{ width: 100, height: 130, objectFit: "cover" }} />

            <div className="ms-3 d-flex flex-column justify-content-between flex-grow-1">
              <div>
                <div className="fw-semibold">The Sum of All Things</div>
                <div className="fw-bold text-success">232 rupees</div>
                
              </div>
              <a href="#" className="text-danger text-decoration-none mt-2">Remove item</a>
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
              <select className="form-select form-select-sm mt-2" style={{ maxWidth: 250 }}>
                <option>Sunil Datta Umratkar Hanumantwada...</option>
              </select>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mb-4">
            <button className="btn fw-semibold px-4 py-2" style={{ ...roundedBtn, backgroundColor: "#80ed99ff" }}>
              Continue
            </button>
          </div>

          {/* Accordion Section */}
          <div className="accordion" id="checkoutAccordion">
            {[
              { id: "Address", title: "Select a delivery address", content: "[Address List]" },
              { id: "Payment", title: "Payment method", content: "[Payment Methods]" },
              { id: "Review", title: "Review items and delivery", content: "[Order Summary]" },
            ].map(({ id, title, content }, i) => (
              <div className="accordion-item" key={id}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${id}`}
                  >
                    {title}
                  </button>
                </h2>
                <div
                  id={`collapse${id}`}
                  className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                  data-bs-parent="#checkoutAccordion"
                >
                  <div className="accordion-body">{content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4 ps-md-4">
          <div className="border p-3 rounded" style={{ backgroundColor: "#f9f9f9", borderColor: "#c7f9ccff" }}>
            <h5>Total</h5>
            <hr />
            <div className="fw-semibold mb-2">Items: --</div>
            <div className="fw-semibold mb-2">Delivery: --</div>
            <div className="fw-bold fs-5">Order Total: 232 rupees</div>
            <button
              className="btn w-100 mt-3 text-white fw-semibold"
              style={{ ...roundedBtn, backgroundColor: "#57cc99ff" }}
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
