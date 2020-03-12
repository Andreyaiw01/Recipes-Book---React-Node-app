import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalAddNewRecipe from './modal/modalAddNewRecipe';
import ModalRewriteRecipe from './modal/modalRewriteRecipe';
import ModalArchive from './modal/modalArchive';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      intervalIsSet: false,
      modalShow: false,
      modalRewriteShow: false,
      modalArchiveShow: false,
      updateRecipeDescription: '',
      masArchiveById: [],
    };
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 10000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  showModalRewriteRecipe = (event) => {
    let id = event.target.id // mongos id
    let recipeIndex = this.state.data.findIndex(item => item._id == id); // id in mas
    let updateRecipeDescription = this.state.data[recipeIndex].recipe[0].recipeDescription;
    this.setState({
      modalRewriteShow: true,
      idToUpdate: id,
      updateRecipeDescription: updateRecipeDescription
    })
  };

  showModalArchive = (e) => {
    let desiredRecipe = this.state.data.find(item => item._id == e.target.id);
    this.setState({
      modalArchiveShow: true,
      masArchiveById: desiredRecipe.recipe
    })
  };

  render() {
    const { data } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Book of recipes</h1>
            <Button variant="success" onClick={() => {this.setState({modalShow: true})}}>
              <FontAwesomeIcon icon={faPlus} /> Add New Recipe
            </Button>
            <hr/>
            <ModalAddNewRecipe
              show={this.state.modalShow}
              onHide={() => {this.setState({modalShow: false})}}
            />
            <ModalRewriteRecipe
              show={this.state.modalRewriteShow}
              onHide={() => {this.setState({modalRewriteShow: false})}}
              idToUpdate= { this.state.idToUpdate }
              updateRecipeDescription= { this.state.updateRecipeDescription }
            />
            <ModalArchive
              show={this.state.modalArchiveShow}
              onHide={() => {this.setState({modalArchiveShow: false})}}
              data={ this.state.masArchiveById }
            />            
          </Col>
        </Row>
        <Row>
          <Col>
            {
              data.map((item, index) => {
                return(
                  <Card key={index} className="card-recipe">
                    <Card.Header>{item.recipe[0].date}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {item.recipe[0].recipeDescription}
                      </Card.Text>                                           
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <Button variant="info" id={item._id} onClick={this.showModalRewriteRecipe}> <FontAwesomeIcon icon={faEdit} /> Edit</Button>
                      {
                        item.recipe.length > 1 ? 
                        <Button id={item._id} variant="link" onClick={this.showModalArchive}>Show Archive</Button>:
                        <></>
                      }
                    </Card.Footer>
                  </Card>                  
                )
              })
            }            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
