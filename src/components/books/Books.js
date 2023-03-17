import React, { useEffect, useState } from "react";
import { useGetBooksQuery } from "../../features/api/ApiSlice";
import BookItem from "./BookItem";

const Books = ({ searchText }) => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { data: books, isLoading, isError } = useGetBooksQuery();

  //filtering
  useEffect(() => {
    if (searchText) {
      setItems(
        books?.filter((bk) =>
          bk.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setItems(books);
    }
  }, [books, searchText]);

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p style={{ color: "red" }}>There was an error...</p>;
  }
  if (!isLoading && !isError && items?.length === 0) {
    content = <p>No Book Found...</p>;
  }
  if (!isLoading && !isError && items?.length > 0) {
    if (toggle) {
      content = items
        ?.filter((b) => b.featured === true)
        .map((bk) => <BookItem key={bk.id} book={bk} />);
    } else {
      content = items?.map((bk) => <BookItem key={bk.id} book={bk} />);
    }
  }

  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>

          <div className="flex items-center space-x-4">
            <button
              className={`lws-filter-btn ${!toggle && "active-filter"}`}
              onClick={() => setToggle(false)}
            >
              All
            </button>
            <button
              className={`lws-filter-btn ${toggle && "active-filter"}`}
              onClick={() => setToggle(true)}
            >
              Featured
            </button>
          </div>
        </div>
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </div>
    </main>
  );
};

export default Books;
