import React, { useState } from "react";
import "./App.css";
import "./styles/style.css";
import Books from "./components/books/Books";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./components/edit/Edit";
import Add from "./components/add/Add";

function App() {
  const [searchText,setSearchText] = useState("")
  return (
    <BrowserRouter>
      <Header setSearchText={setSearchText} />
      <Routes>
        <Route path="/" element={<Books searchText={searchText} />}/>
        <Route path="/edit/:bookId" element={<Edit/>}/>
        <Route path="/add" element={<Add/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
