import React from 'react';
import { useGlobalContext } from '../../context';  // Access context
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();  // Access context

  if (loading) return <Loading />;

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2 style={{color:'#3b3b6d'}}>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {
            books.slice(0, 30).map((item, index) => (
              <Book key={index} {...item} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default BookList;
