import { Component } from 'react';
import Header from './components/Header'
import BookBox from './components/Books'

class App extends Component {
  render(){
    return(
      <div className="container">
        <Header title='CRUD Livros'/>
        <br/>
        <BookBox/>
      </div>
    );
  }
}

export default App;
