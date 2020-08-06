import React from 'react';

import './App.css';


import Header from './Header';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import ResultsDisplay from './ResultsDisplay';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKey: 'AIzaSyDAxGwztxRsiwnL2wzbpUOGlTjRy87qEjU',
      searchTerm: '',
      bookData: [],
      printType: 'all',
      bookType: 'all',
      bookNotFoundMessage: ''
    };
  }

  searchForBooks = () => {
    fetch('https://www.googleapis.com/books/v1/volumes?q='+this.state.searchTerm+'+intitle:'+this.state.searchTerm+'&printType='+this.state.printType+'&bookType='+this.state.bookType+'&key='+this.state.apiKey)
      .then(response => response.json())
      .then(data => {
        if (data.totalItems === 0) {
          this.setState({
            bookData: [],
            bookNotFoundMessage: 'No book has been found which matches your query'
          });
          return;
        }

        let bookDataNew = [];
        data.items.map((item, index) => {
          if (typeof item.volumeInfo === 'undefined' || typeof item.saleInfo.saleability === 'undefined') {
            return (<></>);
          }

          let requiredData = {
            title: '',
            subtitle: '',
            description: '',
            authors: [],
            saleability: '',
            price: '',
            image: 'https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg'
          };

          
          if (typeof item.volumeInfo.title !== 'undefined') {
            requiredData.title = item.volumeInfo.title;
          }

          if (typeof item.volumeInfo.subtitle !== 'undefined') {
            requiredData.subtitle = item.volumeInfo.subtitle;
          }

          if (typeof item.volumeInfo.description !== 'undefined') {
            requiredData.description = item.volumeInfo.description;
          }
          
          if (typeof item.volumeInfo.authors !== 'undefined') {
            requiredData.authors = item.volumeInfo.authors;
          }
          
          if (typeof item.saleInfo.saleability !== 'undefined') {
            requiredData.saleability = item.saleInfo.saleability;
          }
          
          requiredData.price = 0;
          if (requiredData.saleability === "FOR_SALE"
            && typeof item.saleInfo.listPrice !== 'undefined'
            && typeof item.saleInfo.listPrice.amount !== 'undefined'
            && typeof item.saleInfo.listPrice.currencyCode !== 'undefined'
          ) {
            requiredData.price = item.saleInfo.listPrice.amount+' '+item.saleInfo.listPrice.currencyCode;
          }

          if (typeof item.volumeInfo.title !== 'undefined'
            && typeof item.volumeInfo.imageLinks !== 'undefined'
            && typeof item.volumeInfo.imageLinks.thumbnail !== 'undefined'
          ) {
            requiredData.image = item.volumeInfo.imageLinks.thumbnail;
          }

          bookDataNew.push(requiredData);
          return (<></>);
        });

        this.setState({
          bookData: bookDataNew
        });
      });
  }

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleSearchClick = (e) => {
    e.preventDefault();
    this.searchForBooks();
  }

  handlePrintTypeChange = (e) => {
    this.setState({
      printType: e.target.value
    });
  }

  handleBookTypeChange = (e) => {
    this.setState({
      bookType: e.target.value
    })
  }
  

  //map over API Data
  componentDidMount() {
    this.searchForBooks();
  }

  


  render() {
    return (
      <div className="container">
        <Header />
        <SearchBar searchTermProp={this.state.searchTerm} handleSearch={(e) => this.handleSearchChange(e) } handleClickProp={(e) => this.handleSearchClick(e)} />
        <FilterBar handlePrintTypeProp={(e) => this.handlePrintTypeChange(e)} handleBookTypeProp={(e) => this.handleBookTypeChange(e)} />
        <ResultsDisplay bookDataProp={this.state.bookData} />

        <h2 className="red-bold">{this.state.bookNotFoundMessage}</h2>
      </div>
    );
  }
}

export default App;
