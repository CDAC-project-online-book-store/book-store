import React from 'react'
import {Modal, Button} from 'react-bootstrap';


function UserDetailModal({user, show, handleClose, onEdit, onDeactivate}) {
  if (!user) {
    return null; // If no user data is provided, return null
  }
  return (
    <>
     <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
        <p><strong>Created On:</strong> {user.createdOn}</p>
      </Modal.Body>
      <Modal.Footer>
        <button variant="warning" className='btn btn-warning' onClick={() => onEdit(user)}>
          Edit
        </button>
        <Button variant="danger" onClick={() => onDeactivate(user)}>
          Deactivate
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserDetailModal
