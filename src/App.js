import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


function App() {

  return (
    <div className="App" id="App">
      <Quote />
      <div className="circle" id="circle"></div>
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
    this.animateQuote = this.animateQuote.bind(this);
  }

  componentDidMount() {
    this.getQuote();
  }

  animateQuote() {
    console.log('animate');
    const app = document.getElementById('App');
    const quoteText = document.getElementById('quote-text');
    const quoteBox = document.getElementById('quote-box');
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    buttonsArray.forEach(button => {
      button.classList.remove('fade-out');
      setTimeout(() => {
        button.classList.add('fade-out');
      },100);
    });
    app.classList.remove('fade-out');
    setTimeout(() => {
      app.classList.add('fade-out');
    },100);
    quoteBox.classList.remove('scale');
    setTimeout(() => {
      quoteBox.classList.add('scale');
    },100);
    quoteText.classList.remove('fade-in');
    setTimeout(() => {
      quoteText.classList.add('fade-in');
    },100);
  }

  getQuote() {
    const root = document.querySelector(':root');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const prevColor = root.style.getPropertyValue('--main-color');
    console.log(prevColor);
    const quoteBox = document.getElementById('quote-box');
    const windowHeight = window.innerHeight;
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        this.setState({
          quote: data.content,
          author: data.author,
        });
        root.style.setProperty('--previous-color', prevColor);
        root.style.setProperty('--main-color', `#${randomColor+"9a"}`);
        this.animateQuote();
        root.style.setProperty('--secondary-color', `#${randomColor}dd`);
        root.style.setProperty('--quote-height', `${windowHeight/2-quoteBox.clientHeight/2}px`);
      })
      .catch(error => console.error(error));
  }

  render(){
    return (
        <div className="fluid-container quote" id="quote-box">
          <div className="quote-text fade-in" id="quote-text">
            <FontAwesomeIcon icon={faQuoteLeft} className="icon" size="2xl"/>
            <h1 id="text">{this.state.quote}</h1>
          </div>
          <p id="author">- {this.state.author}</p>
          <div className="button-group">
            <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank" rel="noreferrer">
              <button style={{borderRadius:"5px"}} className='twitter button'><span className='tooltiptext'>Tweet this quote</span><FontAwesomeIcon icon={faTwitter} /></button>
            </a>
          <button className="button" onClick={this.getQuote} style={{borderRadius:"5px"}} id="new-quote">Get Quote</button>
          </div>
        </div>
    )
  }
}

export default App;
