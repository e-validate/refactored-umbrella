import React from 'react';
import './App.css';
import routes from './routes';
import Header from './Components/header/Header';
import Chat from './Components/Chat/Chat'
import ChatDisplay from './Components/chatDisplay/ChatDisplay';


function App() {
  return (
    <div className="App">
      <Header />
      <ChatDisplay/>
      {routes}
    </div>
  );
}

export default App;
