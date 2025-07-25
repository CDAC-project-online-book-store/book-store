function AddressBox({ title, onClickHandler }) {
    return (<div className="col-md-4">
        <div
            className="card text-center border-dashed p-4 h-100 d-flex align-items-center justify-content-center"
            style={{ cursor: "pointer", border: "2px dashed #38a3a5", minHeight: "200px" }}
            onClick={onClickHandler}
        >
            <div style={{ fontSize: '2rem', color: '#38a3a5' }}>+</div>
            <div>{title}</div>
        </div>
    </div>);
}

export default AddressBox