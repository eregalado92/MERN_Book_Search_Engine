import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { searchBooks, saveBook } from '../actions/bookActions';
import { selectSavedBooks } from '../selectors/bookSelectors';

const SearchBooks = () => {
  const dispatch = useDispatch();
  const savedBooks = useSelector(selectSavedBooks);

  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    // Dispatch an action to search for books
    dispatch(searchBooks(searchInput));
    setSearchInput('');
  };

  const handleSaveBook = (book) => {
    // Dispatch an action to save the book
    dispatch(saveBook(book));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    disabled={savedBooks.some((savedBook) => savedBook.id === book.id)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveBook(book)}
                  >
                    {savedBooks.some((savedBook) => savedBook.id === book.id)
                      ? 'This book has already been saved!'
                      : 'Save this Book!'}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;
