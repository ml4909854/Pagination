import React, { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Start on page 1 for better UX
  const postPerPage = 10;

  useEffect(() => {
    async function fetchPosts() {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts");
      let data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const totalPage = Math.ceil(posts.length / postPerPage);
  const lastIndexOfPage = currentPage * postPerPage;
  const firstIndexOfPage = lastIndexOfPage - postPerPage;
  const currentPost = posts.slice(firstIndexOfPage, lastIndexOfPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const buttons = [];
  for (let i = 0; i < totalPage; i++) {
    buttons.push(
      <button
        onClick={() => handlePageChange(i + 1)}
        style={{
          backgroundColor: currentPage === i + 1 ? "lightblue" : "#ddd",
        }}
        key={i + 1}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <>
      <div className="pagination">
        <h1>Pagination</h1>
      </div>
      <div className="product-list">
        <h2>Your Product List Here...</h2>
        <div>
          {currentPost.map((element) => (
            <div key={element.id} style={{ display: "flex", gap: "10px" }}>
              <p>{element.id}</p>
              <p>{element.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-buttons">{buttons}</div>
    </>
  );
};

export default Pagination;
