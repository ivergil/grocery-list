import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./modalstyle.css";

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
                        <h3 className="card-title">{this.props.title}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container modal-text" >
                        <h5 className="mb-3 ingredients"> Ingredients</h5>
                        <hr></hr>

                        {this.props.ingredients.map(ing => (
                            <div key={ing.key}>
                                <p>
                                    {ing.amount} {ing.unit} {ing.name}
                                </p>
                            </div>

                        ))}
                        <hr></hr>
                        <h5 className="mb-3 ingredients"> Follow the Instructions</h5>
                        <hr></hr>
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
