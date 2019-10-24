// import React, { Component } from 'react';
// import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

// export class addModal extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <Modal
//                 {...this.props}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         Recipe Description
//         </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>

//                 < div className = "container">
                    
//                 </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button S>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         );
//     }
// }

import React from "react";
import Modal from "./Component/Modal";
import "./"

export default class Modal extends React.Component{
    render(){
        return <div>Hello Modal</div>;
    }
}