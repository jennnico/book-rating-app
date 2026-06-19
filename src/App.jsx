import { useState } from 'react'
import { ratings } from './ratings.js'
import bear from './assets/bear.jpg'
import beet from './assets/beet.png'
import './App.css'

function App() {
  
  const [hoveredBeet, setHoveredBeet] = useState(null); //hover beets
  const [selectedBeet, setSelectedBeet] = useState(null); //select beets
  const [text, setText] = useState(""); //user input
  const [books, setBooks] = useState([]); //book list
  const [editVisible, setEditVisible] = useState(false); //display edit section
  const [editingBookId, setEditingBookId] = useState(null);
  const [editText, setEditText] = useState(""); //user input
  const activeBeet =
    hoveredBeet !== null
      ? hoveredBeet
      : selectedBeet;

  //update input area
  const handleChange = (event) => {
    setText(event.target.value)
    let title = event.target.value  
  }
  
  //ADD book information
  const addTitle = (event) => {
    let newBook = {
      id: crypto.randomUUID(),
      title: text,
      rating: selectedBeet,
      description: ratings[selectedBeet]
    }
    setBooks([...books, newBook])
    setText("");
    setSelectedBeet(null);
  }
 
  //handle clicking a beet
  const selectBeet = (i) => {
    setSelectedBeet(i);
    const description = ratings[i]; 
  }  

  //EDIT book - update input area
  const handleUpdate = (event) => {
    setEditText(event.target.value)
    let title = event.target.value  
  }

  //EDIT book - change title 
  const saveEdits = () => {
    const updatedBooks = books.map(book => {
      if (book.id === editingBookId) {
        return {
          ...book,
          title: editText
        };
      }

      return book;
    });

    setBooks(updatedBooks);
  }

  //DELETE book information
  const removeTitle = (id) => {
    setBooks(books.filter(book => book.id !== id))
  }

  return (
    <div id="container">
      <h1 id="heading">Bears. Beets. Books.</h1>
      <div className="enterTitle">
        <p className="enterTitle__p">Enter your book title:</p>
        <input
          id="userInput" 
          placeholder="Book Title"
          value={text} 
          onChange={handleChange}
        />
      </div>
      <p id="question">How many beets?</p>
      <div id="beets"> 
        {[0, 1, 2, 3, 4].map((i) => (
          <img
            key={i}
            id={i}
            src={beet}
            width="100"
            height="165"
            alt="Beet clipart"
            className={
              i <= activeBeet
                ? 'beet hover'
                : 'beet'
            }
            onMouseEnter={() => setHoveredBeet(i)}
            onMouseLeave={() => setHoveredBeet(null)}
            onClick={() => selectBeet(i)}
          />
        ))}
      </div>
      <button disabled={!text || selectedBeet === null} id="rateButton" onClick={addTitle}>Rate my book!</button> 
      <ul id="bookTitles">
          {books.map(book => (
            <li className="book" key={book.id} id={book.id}>
              <div className="title"><div className="label">Book Title: </div>{book.title}</div>
              <div className="rating"><div className="label">Rating: </div>{book.rating + 1} beets. {book.description}</div>
              <div className="actions">
                <a className="icon edit" onClick={() => {setEditingBookId(book.id); setEditText(book.title); setEditVisible(true);}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"/></svg>
                </a>
                <a className="icon close" onClick={() => removeTitle(book.id)}>X</a>
              </div>
            </li>
          ))} 
      </ul>
      {editVisible && (   
        <div id="edit" className="enterTitle">
          <p className="enterTitle__p">Update your book title:</p>
          <input
            id="edit__userInput" 
            value={editText} 
            onChange={handleUpdate} 
          />
          <button onClick={() => {setEditVisible(false); saveEdits()}}>Update!</button>
        </div>
      )}
      <img src={bear} id="bear" width="728" height="485" alt="Bear resting on a log" />
    </div>  
  )
  } 

  export default App;