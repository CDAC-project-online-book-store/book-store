import React from 'react'
import dummyBooks from '../../data/dummyBooks'
import dummyUsers from '../../data/dummyUsers';
import dummyOrders from '../../data/dummyOrders';


function Analytics() {
  //  get the dummy data for analytics
  const totalBooks = dummyBooks.length;
  const totalUsers = dummyUsers.length;
  const deliveredOrders = dummyOrders.filter(order => order.status === 'Delivered').length;
  const pendingOrders = dummyOrders.filter(order => order.status === 'Pending').length;
  const cancelledOrders = dummyOrders.filter(order => order.status === 'Cancelled').length;


  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Analytics </h2>
      <div className="d-flex justify-content-between align-items-center mb-3 overflow-auto gap-3 pb-3">
        {/* total books card */}

        <div>

          <div className="card shadow-sm border-info " style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-info'>📚 Total Books</h5>
              <p className='card-text fs-4 fw-bold'>{totalBooks}</p>
            </div>

          </div>
        </div>

        {/* total users card */}
        <div>

          <div className="card shadow-sm border-success" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-success'>👥 Total User</h5>
              <p className='card-text fs-4 fw-bold'>{totalUsers}</p>
            </div>
          </div>

        </div>


        {/* total orders delivered card */}
        <div>

          <div className="card shadow-sm border-primary" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-primary'>📦 Ordered Delivered</h5>
              <p className='card-text fs-4 fw-bold'>{deliveredOrders}</p>
            </div>
          </div>

        </div>


        {/* total orders pending card */}
        <div>

          <div className="card shadow-sm border-warning" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-warning'>🔁 Order in progress</h5>
              <p className='card-text fs-4 fw-bold'>{pendingOrders}</p>
            </div>
          </div>

        </div>


        {/* total orders cancelled card */}
        <div>

          <div className="card shadow-sm border-danger" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-danger'>❌ Orders Cancelled</h5>
              <p className='card-text fs-4 fw-bold'>{cancelledOrders}</p>
            </div>
          </div>

        </div>


      </div>

    </div>
  )
}

export default Analytics
