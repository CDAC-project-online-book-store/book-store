import React from 'react';

const Settings = () => {
  const userData = {
    name: 'Rendered name',
    email: 'Rendered email',
    password: 'Rendered password',
    mobile: 'Rendered mobile no',
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 text-primary">Login & Security</h3>

      <div className="card shadow-sm">
        <div className="card-body">

          {/* Name */}
          <div className="row mb-3 align-items-center">
            <label className="col-md-2 fw-bold">Name:</label>
            <div className="col-md-7">
              <input type="text" className="form-control" value={userData.name} readOnly />
            </div>
            <div className="col-md-3 text-end">
              <button className="btn btn-outline-primary w-100 w-md-auto">Edit</button>
            </div>
          </div>

          {/* Email */}
          <div className="row mb-3 align-items-center">
            <label className="col-md-2 fw-bold">Email:</label>
            <div className="col-md-7">
              <input type="text" className="form-control" value={userData.email} readOnly />
            </div>
            <div className="col-md-3 text-end">
              <button className="btn btn-outline-primary w-100 w-md-auto">Edit</button>
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3 align-items-center">
            <label className="col-md-2 fw-bold">Password:</label>
            <div className="col-md-7">
              <input type="password" className="form-control" value={userData.password} readOnly />
            </div>
            <div className="col-md-3 text-end">
              <button className="btn btn-outline-primary w-100 w-md-auto">Edit</button>
            </div>
          </div>

          {/* Mobile No */}
          <div className="row mb-2 align-items-center">
            <label className="col-md-2 fw-bold">Mobile No:</label>
            <div className="col-md-7">
              <input type="text" className="form-control" value={userData.mobile} readOnly />
            </div>
            <div className="col-md-3 text-end">
              <button className="btn btn-outline-primary w-100 w-md-auto">Edit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
