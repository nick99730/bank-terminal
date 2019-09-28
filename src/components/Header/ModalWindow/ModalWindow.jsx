import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import style from './ModalWindow.module.css'


function ModalWindow(props) {
    return(
        <Modal show={props.show} onHide={props.handleClose}>
                  <Modal.Header className={style.no_shadow} closeButton>
                      <Modal.Title className={style.text_center}>Log in</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="input-group mb-3">
                          <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">Login</span>
                          </div>
                          <input type="text" className={`${style.no_border} ${"form-control shadow-none"}`} placeholder="Username or email" aria-label="Username"
                                 aria-describedby="basic-addon1"/>
                      </div>
                       <div className="input-group mb-3">
                          <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">Password</span>
                          </div>
                          <input type="password" className={`${style.no_border} ${"form-control shadow-none"}`} aria-label="Username"
                                 aria-describedby="basic-addon1"/>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button className="shadow-none" variant="success" onClick={props.handleClose}>
                          Log in
                      </Button>
                  </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;