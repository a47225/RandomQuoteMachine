import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


function App() {
  return (
    <div className="App">
      <Quote />
    </div>
  );
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
    }
    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    const root = document.querySelector(':root');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const quoteBox = document.getElementById('quote-box');
    const windowHeight = window.innerHeight;
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        this.setState({
          quote: data.content,
          author: data.author,
        });
        root.style.setProperty('--main-color', `#${randomColor+"9a"}`);
        root.style.setProperty('--secondary-color', `#${randomColor}dd`);
        root.style.setProperty('--quote-height', `${windowHeight/2-quoteBox.clientHeight/2}px`);
      })
      .catch(error => console.error(error));
  }

  render(){
    return (
      <div className="fluid-container quote" id="quote-box">
        <div className="quote-text">
          <FontAwesomeIcon icon={faQuoteLeft} className="icon" size="2xl"/>
          <h1 id="text">{this.state.quote}</h1>
        </div>
        <p id="author">- {this.state.author}</p>
        <div className="button-group">
          <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank" rel="noreferrer">
            <button style={{borderRadius:"5px"}}><FontAwesomeIcon icon={faTwitter} /></button>
          </a>
        <button onClick={this.getQuote} style={{borderRadius:"5px"}} id="new-quote">Get Quote</button>
        </div>
      </div>
    )
  }
}

export default App;
