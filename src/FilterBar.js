import React from 'react';

class FilterBar extends React.Component {
  render(){
    return(
      <div id="filter-bar">
        <label htmlFor="print-type">Print Type:</label>
        <select id="print-type" name="print-type" onChange={this.props.handlePrintTypeProp}>
          <option value="all">All</option>
          <option value="books">Books</option>
          <option value="magazines">Magazines</option>
        </select>
        <label id="subject-label" htmlFor="book-type">Filter:</label>
        <select id="book-type" name="book-type" onChange={this.props.handleBookTypeProp}>
          <option value="all">All</option>
          <option value="partial">Partial</option>
          <option value="full">Full</option>
          <option value="free-ebooks">Free-ebooks</option>
          <option value="paid-ebooks">Paid-ebooks</option>
          <option value="ebooks">Ebooks</option>
        </select>  
      </div>
    )
  }
}

export default FilterBar;