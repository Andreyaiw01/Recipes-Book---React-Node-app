import React, { Component } from 'react';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';

class ModalArchive extends React.Component {
  render(){
    const { data } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Recipe's Archive
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion>
            {
              data.map((item, index) => {
                return(
                  <Card key={index}>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                          {item.date} 
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index}>
                        <Card.Body>{item.recipeDescription}</Card.Body>
                      </Accordion.Collapse>
                  </Card>                            
                )                        
              })
            }
          </Accordion>
        </Modal.Body>
      </Modal>
    );  
  }
}
export default ModalArchive;