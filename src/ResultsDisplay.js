import React from 'react';

class ResultsDisplay extends React.Component {
  getAuthors = (authorsData) => {
    const authors = authorsData.map((author, index) => {
      return (
        <div key={index}>
          {author}
        </div>
      )
    });
    return authors;
  }

  getPrice = (saleability, price) => {
    if (saleability !== 'FOR_SALE') {
      return (
        <div>
          {saleability}
        </div>
      );
    }

    return (
      <div>
        <div>
          {saleability}
        </div>
        <div>
          {price}
        </div>
      </div>
    )
  }

  render() {
    const books = this.props.bookDataProp.map((book, bookIndex) => {
      return (
        <div className="one-book-container" key={bookIndex}>
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
          <div className="book-details">
            <div className="book-cover-container">
              <img alt="book" src={book.image} />
            </div>
            <div className="book-description">
              <div>
                {this.getAuthors(book.authors)}
                {this.getPrice(book.saleability, book.price)}
                {book.description}
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        {books}
      </div>
    )
  }
}

export default ResultsDisplay;
