import React, { useState } from "react";

function SelectWithAddModal({ label, options, selected, onSelect, onAdd, placeholder }) {
  const [showModal, setShowModal] = useState(false);
  const [newValue, setNewValue] = useState("");

  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="d-flex gap-2">
        <select
          className="form-select"
          multiple
          value={selected}
          onChange={e => {
            const vals = Array.from(e.target.selectedOptions, o => o.value);
            onSelect(vals);
          }}
        >
          {options.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
        <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
          Add
        </button>
      </div>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add {label}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  placeholder={placeholder}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                  onAdd(newValue);
                  setNewValue("");
                  setShowModal(false);
                }}>Add</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectWithAddModal;
