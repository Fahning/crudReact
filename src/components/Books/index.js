import React, { Component  } from 'react';
import api from '../../api';
// import PubSub from 'pubsub-js';
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './styles.css';


class FormBook extends Component {

  state = {
    model: {
      id_book: '',
      title: '',
      author: '',
      publish_company: '',
      release_year: 0,
      state: '',
      pages: 0,
      image: null

    }
  };

  setValues = (e, field) => {
    const model = this.state.model;
    model[field] = e.target.value;
    this.setState({ model });
  }

  
  create = (e) => {
    this.props.createBook(this.state.model);
  }

  render() {
    return(
      <div className="my-5 mx-5">
        <Form>
          <FormGroup>
            <div className="form-row">
              <div className="col-md-6">
                <Label for="title">Título</Label>
                <Input id="title" value={this.state.model.title} onChange={e => this.setValues(e, 'title')} placeholder="Título do livro..."/>
              </div>
              <div className="col-md-6">
                <Label for="author">Autor</Label>
                <Input id="author" value={this.state.model.author} onChange={e => this.setValues(e, 'author')} placeholder="Autor do livro..."/>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="form-row">
              <div className="col-md-6">
                <Label for="publish_company">Editora</Label>
                <Input id="publish_company" value={this.state.model.publish_company} onChange={e => this.setValues(e, 'publish_company')} placeholder="Editora do livro..."/>
              </div>
              <div className="col-md-6">
                <Label for="release_year">Ano</Label>
                <Input id="release_year" value={this.state.model.release_year} onChange={e => this.setValues(e, 'release_year')} placeholder="Ano do livro..."/>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="form-row">
              <div className="col-md-6">
                <Label for="state">Estado</Label>
                <Input id="state" value={this.state.model.state} onChange={e => this.setValues(e, 'state')} placeholder="Estado do livro..."/>
              </div>
              <div className="col-md-6">
                <Label for="pages">Paginas</Label>
                <Input id="pages" value={this.state.model.pages} onChange={e => this.setValues(e, 'pages')} placeholder="Paginas do livro..."/>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="image">Capa do Livro</Label>
            <Input id="image" type="file" value={this.state.model.image} onChange={e => this.setValues(e, 'image')} placeholder="Estado do livro..."/>
          </FormGroup>
          <Button block color="success" onClick={this.create}>Salvar</Button>
        </Form>
      </div>
    );
  }
}

class ListBook extends Component {
  delete = (id) => {
    this.props.deleteBook(id);
  }

  onEdit = (book) => {

    console.log(book);
  }

  render() {
    const { books } = this.props;
    return(
      <div>
        <Table className="table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Imagem</th>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Editora</th>
              <th>Estado</th>
              <th>Paginas</th>
              <th>Cadastrado</th>
              <th>AçõesdeEdição</th>
            </tr>
          </thead>
          <tbody className="justify-content-center text-center">
            {
              books.map(book => (
                <tr key={book.id_book}>
                  <td><img  src={book.image} className="img-fluid rounded mx-auto"  alt="Capa do Livro"/></td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.release_year}</td>
                  <td>{book.publish_company}</td>
                  <td>{book.state}</td>
                  <td>{book.pages}</td>
                  <td>{book.created_at}</td>
                  <td>
                    <Button color="info" size="sm" onClick={e => this.onEdit(book)}>Editar</Button>
                    <Button color="danger" size="sm" onClick={e => this.delete(book.id_book)}>Excluir</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default class BookBox extends Component{
  state = {
    books: [],
  }
  
  async componentDidMount() {
    try {
      const { data } = await api.get('books/');
      this.setState({books: data});
    } catch (error) {
      console.log(error);
    }
  }

  create = async (book) => {
    let bookData = {
      title: book.title,
      author: book.author,
      publish_company: book.publish_company,
      release_year: parseInt(book.release_year),
      state: book.state,
      pages: parseInt(book.pages),
      image: book.image
    }
    try {
      const { data } = await api.post('books/', bookData);
      let { books } = this.state;
      books.push(data);
      this.setState({ books });
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  delete = async (id_book) => {
    try {
      const { data } = await api.delete('books/' + id_book);
      const books = this.state.books.filter(book => book.id_book !== id_book)
      this.setState({ books });
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          <h2 className="font-weight-bold text-center">Cadastro de Livros</h2>
          <FormBook createBook={this.create} />
        </div>
        <div className="col-md-12">
          <h2 className="font-weight-bold text-center">Lista de Livros</h2>
          <ListBook books={this.state.books} deleteBook={this.delete} />
        </div>
   </div>
    );
  }
}