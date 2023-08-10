import { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const App = () =>{
  const pageSize = 5
  const country = "in"
  const [progress, setProgressState] = useState(0);
  const [mode, setMode] = useState('light');

  const setProgress = (val) => {
     setProgressState(val);
  }
  
  const darkModeFunc = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = "#202124";
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = "white";

    }
  }

  return(
      <BrowserRouter basename="/newSSpider">
        <Navbar darkModeBtn={darkModeFunc} mode={mode}/>
        <LoadingBar color='#f11946'
        progress={progress}
        height={3}/>
        <Routes>
          <Route path="/" exact element={<News mode={mode} setProgress={setProgress} pageSize={pageSize} category="general" country = {country} key="general"/>}/>
          <Route exact path="/business" element={<News mode={mode} setProgress={setProgress} pageSize={pageSize} category="business" country = {country} key="business"/>}/>
          <Route exact path="/entertainment" element={<News mode={mode} setProgress={ setProgress} pageSize={pageSize} category="entertainment" country = {country} key="entertainment"/>}/>
          <Route exact path="/health" element={<News mode={mode} setProgress={setProgress} pageSize={pageSize} category="health" country = {country} key="health"/>}/>
          <Route exact path="/science" element={<News mode={mode} setProgress={setProgress} pageSize={pageSize} category="science" country = {country} key="science"/>}/>
          <Route exact path="/sports" element={<News mode={mode} setProgress={setProgress} pageSize={pageSize} category="sports" country = {country} key="sports"/>}/>
          <Route exact path="/technology" element={<News mode={mode} setProgress={ setProgress} pageSize={pageSize} category="technology" country = {country} key="technology"/>}/>
        </Routes>
      </BrowserRouter>
  );
}
export default App;
