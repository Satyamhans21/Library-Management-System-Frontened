import React from 'react';

const AddBookPage = () => {
  return (
    <div>
      <h1>Add Book</h1>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" placeholder="Enter book title" />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" placeholder="Enter author's name" />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" placeholder="Enter genre" />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" placeholder="Enter ISBN" />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
