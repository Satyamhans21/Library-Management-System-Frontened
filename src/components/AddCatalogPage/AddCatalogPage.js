import React from 'react';

const AddCatalogPage = () => {
  return (
    <div>
      <h1>Add Catalog</h1>
      <form>
        <div>
          <label>Catalog Name:</label>
          <input type="text" placeholder="Enter catalog name" />
        </div>
        <div>
          <label>Description:</label>
          <textarea placeholder="Enter catalog description"></textarea>
        </div>
        <button type="submit">Add Catalog</button>
      </form>
    </div>
  );
};

export default AddCatalogPage;
