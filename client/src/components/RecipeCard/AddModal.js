import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import "./style.css";

export class AddModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="contained-modal-title-vcenter modal-text">
                        <h1>{this.props.title}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <h5 id="ingredients" className= "mb-3"> Ingredients</h5>
                    
                        {this.props.ingredients.map(ing => (
                            <div key={ing.key}>
                                <p className="modal-text">
                                {ing.amount} {ing.unit} {ing.name}
                                </p>
                            </div>
                            
                        ))}

                        <h5 id="instructions"> Follow the Instructions</h5>
                        {this.props.instructions}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}
