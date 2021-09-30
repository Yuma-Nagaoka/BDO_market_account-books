import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Book from './pages/Book'
import Book_anot from './pages/Book_anot'
import Book3 from './pages/Book3'
import Header from './modules/Header'
import Footer from './modules/Footer'
import Home from './pages/Home'
import HowTo from './pages/HowTo'
import { StyledEngineProvider } from '@mui/material/styles';
// import Icon from '../title.png'

export default function App() {
  const style = {
    image: {
    },
  };
  return (
    <div className="App">
      <Router>
        <StyledEngineProvider injectFirst>
          <Header />
        </StyledEngineProvider>
        {/* <h1>黒い砂漠　統合取引所　帳簿</h1> */}
        {/* <div align="center">
          <img src={`${process.env.PUBLIC_URL}/title.png`} alt="Title"></img>
        </div> */}
        <Route exact path="/" component={Home} />
        <Route path="/HowTo" component={HowTo} />
        <Route path="/book/:date" component={Book3} />
        {/* <Route path="/xlsx" component={MakeXlsx} /> */}
        <Footer />
      </Router>
    </div>
  );
}