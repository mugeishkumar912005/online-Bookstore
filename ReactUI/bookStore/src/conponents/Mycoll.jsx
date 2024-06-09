import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import './Mycoll.css'; 

const Mycoll = () => {
  const location = useLocation();
  const userId = localStorage.getItem("userId") || '0'; 
  const [userCollection, setUserCollection] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      setLoading(true);
      fetchUserCollection();
  }, []);

  const fetchUserCollection = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/MyCollection/${userId}`);
      setUserCollection(response.data);
      setLoading(false); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUserCollection([]);
      } else {
        console.error("Error fetching user collection:", error);
      }
      setLoading(false); 
    }
  };
  // const handleopen=()=>{
    
  // }
  const removeFromCollection = async (bookId) => {
      if (!userId) {
          alert("Please log in to remove books from your collection.");
          return;
      }
      try {
          await axios.delete(`http://localhost:5000/RemoveFromColl/${userId}/${bookId}`);
          setUserCollection(prevCollection => prevCollection.filter(book => book._id !== bookId));
          alert("Book removed from your collection successfully!");
      } catch (error) {
          alert("Error removing book: " + error.message);
      }
  };

  if (loading) {
      return <div>Loading...</div>; 
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <Link to="/home">Home</Link>
          <Link to="/Login">Logout</Link>
        </div>
      </nav>
      <div className="mycoll-container">
        <h1 className="heading">My Collection</h1>
        <div className="contain-mybooks">
          {userCollection.map((book) => (
            <div className="books-my" key={book._id}>
              <img src={book.Book_img} alt="Book cover" />
              <div className="book-details">
                <p>{book.Book_Name}</p>
                <p>Author: {book.Author_Name}</p>
                <p>Category: {book.Catagory}</p>
                <p>Rating: {book.Ratings}</p>
                <p>Price: ${book.Rate}</p>
              </div>
              <button className="del-btn" onClick={() => removeFromCollection(book._id)}>Remove</button>
              <button id='Addbtn' >Read</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mycoll;
