import { useNavigate } from "react-router-dom";

function AddressBox() {

    const navigate = useNavigate();
    
    const handleAddClick = () => {
    navigate('/add-new-address');
    };
    
    return (<div className="col-md-4">
        <div
            className="card text-center border-dashed p-4 h-100 d-flex align-items-center justify-content-center"
            style={{ cursor: "pointer", border: "2px dashed #38a3a5", minHeight: "200px" }}
            onClick={handleAddClick}
        >
            <div style={{ fontSize: '2rem', color: '#38a3a5' }}>+</div>
            <div>Add Address</div>
        </div>
    </div>);
}

export default AddressBox