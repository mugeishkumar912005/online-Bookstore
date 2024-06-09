import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Book from './BOOKSTORE/book.png';
import './Home.css'; 

const Home = () => {
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('name');
  const userId = new URLSearchParams(location.search).get('id');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayData, setDisplayData] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    fetchData();
    fetchTopRatedBooks();
  }, [selectedCategory, userId]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${selectedCategory}`);
      setDisplayData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTopRatedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Top');
      setTopRatedBooks(response.data.TopC);
    } catch (error) {
      console.error("Error fetching top rated books:", error);
    }
  };

  // const fetchUserCollection = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/MyCollection/${userId}`);
  //     setUserCollection(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user collection:", error);
  //   }
  // };

  const AddinMyColl = async (bookData) => {
    if (!userId) {
      alert("Please log in to add books to your collection.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/AddtoColl/${userId}`, bookData);
      alert("Book added to your collection successfully!");
    } catch (error) {
      alert("Error adding book: " + error.message);
    }
  };

  return (
    <div className="HBod">
      <nav className="nav">
        <img src={Book} alt="BookWorms Logo" width="40px"/>
        <h1>BookWorms</h1>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li>
            <section id="Category">
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">Select Category</option>
                <option value="novel">Novel</option>
                <option value="Fantacy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="biography">Biography</option>
                <option value="comedy">Comedy</option>
                <option value="Documentary">Documentary</option>
              </select>
            </section>
          </li>
          <li><Link to='/Mycoll'>MyCollection</Link></li>
          {userName && <li>Welcome, {userName}</li>}
          <li><Link to='/Login' id="logout-btn">Logout</Link></li>
        </ul>
      </nav>
      <div className="Top">
        <h1><i>"One Book is Better Than 1000 Friends"<p>-Gajanandha.</p></i></h1>
      </div>
      <div className="Mcontdiv">
        {displayData && displayData.map((bookData) => (
          <div className="cont" key={bookData._id}>
            <img src={bookData.Book_img} alt="Book cover" width="100px"/>
            <p>Author Name: {bookData.Author_Name}</p>
            <p>Book Name: {bookData.Book_Name}</p>
            <p>Rate: {bookData.Rate}</p>
            <p>Category: {bookData.Catagory}</p>
            <p>Rating: {bookData.Ratings}</p>
            <p>Stock: {bookData.Stock}</p>
            <button id="Addbtn" onClick={() => AddinMyColl(bookData)}>Add To My Collection</button>
            <button id='Addbtn' >Read</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
