import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModalAddNewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecipeDescription: '',
      date: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.putDataToDB = this.putDataToDB.bind(this);
  }
 
  handleChange(event) {
    this.setState({valueRecipeDescription: event.target.value});
  }

  putDataToDB = (event) => {
    event.preventDefault();
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };    
    const currentDate = new Date().toLocaleString("ru", options);
    axios.post('http://localhost:3001/api/putData', {
      recipeDescription: this.state.valueRecipeDescription,
      date: currentDate
    })
    .then(res => {
      if(res.status == 200) {
        this.setState({valueRecipeDescription:''})
        this.props.onHide();
      } else {
        alert(res);
      }
    });
  };
  
  render(){
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={ this.putDataToDB }>
            <Form.Group controlId="formRecipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control required as="textarea" rows="5" value={this.state.valueRecipeDescription} name='recipeDescription' onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );  
  }
}

export default ModalAddNewRecipe;