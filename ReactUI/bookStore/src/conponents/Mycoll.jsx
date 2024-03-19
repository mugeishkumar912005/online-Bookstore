import { useEffect, useState } from "react";
import axios from "axios";
const Mycoll = (props) => {
  const [Add, setAdd] = useState([]);
  useEffect(() => {
    GetId();
  }, [setAdd]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/Addtocoll/');
  //     setAdd(response.data);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  const GetId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/GetMycoll/1");
      setAdd(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
    <div className="heading">
    <h1>My Collections</h1>
    </div>
      <div className="ContainMybooks">
        {Add.map((item) => (
          <div className="booksMy" key={item.userid}>
            <img src={item.Book_img} alt="" width="150px" />
            <p>Author Name: {item.Author_Name}</p>
            <p>Book Name: {item.Book_Name}</p>
            <p>Rate: {item.Rate}</p>
            <p>Category: {item.Catagory}</p>
            <p>Rating: {item.Ratings}</p>
            <button id="delBtn">Remove</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Mycoll;
