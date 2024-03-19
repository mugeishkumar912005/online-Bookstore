import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Book from './BOOKSTORE/book.png'
const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [displayData, setDisplayData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, [selectedCategory]);
  
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
  
    const AddinMyColl = async (userid, bookData) => {
      try {
        const response = await axios.post(`http://localhost:5000/AddtoColl/${userid}`, bookData);
        alert("Book added to your collection successfully!");
      } catch (error) {
        alert("Error adding book: " + error.message);
      }
    };
  
    return (
      <div className="HBod">
        <nav className="nav">
        <img src={Book} alt="" width="40px"/><h1>BookWorms</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>
              <section id="Category">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="all">Select Category</option>
                  <option value="novel">Novel</option>
                  <option value="Fantacy">Fantacy</option>
                  <option value="Horror">Horror</option>
                  <option value="biography">Biography</option>
                  <option value="comedy">Comedy</option>
                  <option value="Documentary">Documentary</option>
                </select>
              </section>
            </li>
            <li><Link to='/Mycoll'>MyCollection</Link></li>
            <li><Link to='/Login'>Login</Link></li>
            <li><Link to='/SignUP'>SignUp</Link></li>
          </ul>
        </nav>
        <div className="Top">
            <h1><i>"One Book is Better Than 1000 Friends"<p>-Gajanandha.</p></i></h1>
        </div>
        <div className="Top">
  {displayData.map(({ _id, userid, ...bookData }) => {
    if (bookData.Ratings >= 4.5) {
      return (
        <div className="topr" key={_id}>
          <img src={bookData.Book_img} alt="" width="100px" />
          <p>Author Name: {bookData.Author_Name}</p>
          <p>Book Name: {bookData.Book_Name}</p>
          <p>Rate: {bookData.Rate}</p>
          <p>Category: {bookData.Category}</p>
          <p>Rating: {bookData.Ratings}</p>
          <p>Stock: {bookData.Stock}</p>
        </div>
      );
    }
    return null;
  })}
</div>

        <div className="Mcontdiv">
          {displayData.map(({ _id, userid, ...bookData }) => ( 
            <div className="cont" key={userid}>
              <img src={bookData.Book_img} alt="" width="100px"/>
              <p>Author Name: {bookData.Author_Name}</p>
              <p>Book Name: {bookData.Book_Name}</p>
              <p>Rate: {bookData.Rate}</p>
              <p>Category: {bookData.Catagory}</p>
              <p>Rating: {bookData.Ratings}</p>
              <p>Stock: {bookData.Stock}</p>
              <button id="Addbtn" onClick={() => AddinMyColl(userid, bookData)}>Add To My Collection</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;
  