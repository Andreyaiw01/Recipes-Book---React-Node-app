import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModalRewriteRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecipeDescriptionNew: '',
      date: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      valueRecipeDescriptionNew: this.props.updateRecipeDescription
    })  
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.updateRecipeDescription !== prevProps.updateRecipeDescription) {
      this.setState({
        valueRecipeDescriptionNew: this.props.updateRecipeDescription
      })
    }
  }
 
  handleChange(event) {
    this.setState({valueRecipeDescriptionNew: event.target.value});
  }

  putDataToDBArchive = (event) => {     
    if(this.props.updateRecipeDescription != this.state.valueRecipeDescriptionNew) {
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

      axios.post('http://localhost:3001/api/updateData', {
        recipeDescription: this.state.valueRecipeDescriptionNew,
        date: currentDate,
        id: this.props.idToUpdate,
      })
      .then(res => {
        if(res.status == 200) {
          this.props.onHide();
        } else {
          alert(res);
        }
      });      
    } else {
      this.props.onHide();
    }
    event.preventDefault();
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
            Update Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.putDataToDBArchive}>
            <Form.Group controlId="formRecipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control required as="textarea" rows="5" value={this.state.valueRecipeDescriptionNew} name='recipeDescription' onChange={this.handleChange}/>
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

export default ModalRewriteRecipe;