import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";

import { removeBook } from "../actions/bookActions";
import { selectSavedBooks } from "../selectors/bookSelectors";

const SavedBooks = () => {
  const savedBooks = useSelector(selectSavedBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch saved books from the server or local storage
    // and dispatch an action to store them in the Redux store
  }, []);

  const handleDeleteBook = (bookId) => {
    // Dispatch an action to remove the book from the saved books
    dispatch(removeBook(bookId));
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${
                savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book.id} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete this Book!
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

export default SavedBooks;
