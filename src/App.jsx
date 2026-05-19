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

  //update input area
  const handleChange = (event) => {
    setText(event.target.value)
    let title = event.target.value  
  }

  //add book information
  const addTitle = (event) => {
    let newBook = {
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

  return (
    <div id="container">
      <h1 id="heading">Bears. Beets. Books.</h1>
      <div id="container--title">
        <p id="subheading">Enter your book title:</p>
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
              i <= hoveredBeet
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
            <li className="book" key={book.title}>
              <div className="title"><div className="label">Book Title: </div>{book.title}</div>
              <div className="rating"><div className="label">Rating: </div>{book.rating + 1} beets. {book.description}</div>
            </li>
          ))} 
      </ul>
      <img src={bear} id="bear" width="728" height="485" alt="Bear resting on a log" />
    </div>  
  )
  } 

  export default App;