import {Routes, Route, Link} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import News from './pages/News'
import Contact from './pages/Contact'


function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/news'>News</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/News' element={<News></News>}/>
        <Route path='/Contact' element={<Contact></Contact>}/>
      </Routes>
    </div>
  );
}

export default App;
