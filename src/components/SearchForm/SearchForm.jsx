import React, { useRef, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';  // Import context
import "./SearchForm.css";

const SearchForm = ({ onSearch, initialContext }) => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const navigate = useNavigate();
  const authorRef = useRef(null);
  const bookRef = useRef(null);
  const isbnRef = useRef(null);
  const languageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Collect values from all fields
    const searchParams = {
      author: authorRef.current.value.trim(),
      book: bookRef.current.value.trim(),
      isbn: isbnRef.current.value.trim(),
      language: languageRef.current.value.trim()
    };

    // Check if all fields are empty
    const isAllEmpty = Object.values(searchParams).every(value => value.length === 0);

    if (isAllEmpty) {
      // If no search criteria, you might want to handle this differently
      // This is a placeholder implementation
      alert("Please enter at least one search criteria");
      setLoading(false);
      return;
    }

    // Construct search term
    const searchTerms = [];
    if (searchParams.book) searchTerms.push(`title:${searchParams.book}`);
    if (searchParams.author) searchTerms.push(`author:${searchParams.author}`);
    if (searchParams.isbn) searchTerms.push(`isbn:${searchParams.isbn}`);
    if (searchParams.language) searchTerms.push(`language:${searchParams.language}`);

    const combinedSearchTerm = searchTerms.join(' ');
    
    console.log(combinedSearchTerm)

    if (combinedSearchTerm.length === 0) {
      setSearchTerm("the lost world!");
      setResultTitle("Please Enter Something ...");
      setLoading(false);
    } else {
      setSearchTerm(combinedSearchTerm);  // Set search term
      setLoading(true);  // Start loading
      navigate("/book");
    }

  };

  useEffect(() => {
    // Focus on the book title input when component mounts
    bookRef.current.focus();
  }, []);

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="advanced-search-form" onSubmit={handleSubmit}>
            <div className="search-grid">
              <div className="search-form-elem">
                <label>Book Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book name"
                  ref={bookRef}
                />
              </div>
              
              <div className="search-form-elem">
                <label>Author Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter author name"
                  ref={authorRef}
                />
              </div>
              
              <div className="search-form-elem">
                <label>ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter ISBN"
                  ref={isbnRef}
                />
              </div>
              
              <div className="search-form-elem">
                <label>Language</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter language"
                  ref={languageRef}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="find-button"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Find Books'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;  