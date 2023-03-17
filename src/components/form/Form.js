import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddBookMutation,
  useEditBookMutation,
} from "../../features/api/ApiSlice";

const Form = ({ type, editBookDetail }) => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();
  const [editBook, { isLoading: editBookLoading }] = useEditBookMutation();

  //declaring useState Hook
  const [name, setBookName] = useState("");
  const [author, setBookAuthor] = useState("");
  const [price, setBookPrice] = useState("");
  const [thumbnail, setBookThumbnail] = useState("");
  const [featured, setBookFeatured] = useState(false);
  const [rating, setBookRating] = useState(0);

  //edit Book Detail
  useEffect(() => {
    if (editBookDetail?.name) {
      setBookName(editBookDetail?.name);
      setBookAuthor(editBookDetail?.author);
      setBookPrice(editBookDetail?.price);
      setBookThumbnail(editBookDetail?.thumbnail);
      setBookFeatured(editBookDetail?.featured);
      setBookRating(editBookDetail?.rating);
    }
  }, [editBookDetail]);


  //data reset
  const dataReset = ()=>{
    setBookName("");
    setBookAuthor("");
    setBookPrice("");
    setBookThumbnail("");
    setBookFeatured("");
    setBookRating("");
  }

  //handle Add
  const handleAdd = (e) => {
    e.preventDefault();
    addBook({
      name,
      author,
      thumbnail,
      price,
      rating,
      featured,
    });

    navigate("/");
    dataReset()
  };
  //handle Add
  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      name,
      author,
      thumbnail,
      price,
      rating,
      featured,
    };
    editBook({
      id: editBookDetail?.id,
      data,
    });

    navigate("/");
    dataReset()
  };

  return (
    <form
      className="book-form"
      onSubmit={editBookDetail?.name ? handleEdit : handleAdd}
    >
      <div className="space-y-2">
        <label for="lws-bookName">Book Name</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          value={name}
          name="name"
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label for="lws-author">Author</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={author}
          onChange={(e) => setBookAuthor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label for="lws-thumbnail">Image Url</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setBookThumbnail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label for="lws-price">Price</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={price}
            onChange={(e) => setBookPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label for="lws-rating">Rating</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setBookRating(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
          checked={featured}
          onChange={(e) => setBookFeatured(e.target.checked)}
        />
        <label for="lws-featured" className="ml-2 text-sm">
          {" "}
          This is a featured book{" "}
        </label>
      </div>

      <button
        disabled={isLoading || editBookLoading}
        type="submit"
        className="submit"
        id="lws-submit"
      >
        {type} Book
      </button>
    </form>
  );
};

export default Form;
