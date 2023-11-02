// import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import logo from './components/m.png'

function App() {
  const [input, setInput] = useState('');
  const [datas, setData] = useState('');
  const ref = useRef(null);

  const handleSearch = async () => {
    if(!input){
      window.alert("Please Enter the URL")

    }else{
      try {
        ref.current.continuousStart();
        const response = await axios.get(`https://altbk.onrender.com/check?url=${input}`);
        console.log(response.data);
        setData(response.data);
        ref.current.complete(); 
      } catch (error) {
        ref.current.complete();
      }
    }
  };

  return (
    <div>
      <LoadingBar color="#0000ff" ref={ref} />

      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container-fluid shadow">
        <img src={logo} className="navbar-brand" alt='logo'/>
      </div>
    </nav>

    <div className='hdg'><h1>Image Alt Tag Checker</h1></div>

      <div className="head mt-5 mb-4">
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter the URL"
        className='shadow'
      />
      <button className='button-85 shadow' onClick={handleSearch}>Search</button>
      </div>
     
      <ul>
      {datas && datas !== undefined && ( 
        <div className='dest d-flex mb-5'>
          <div>We found {datas.totalImages} images on your page and {datas.imagesMissingAlt} of them are missing the attribute.</div>
          <div>Alt attributes are an often overlooked and simple way to signal to Search Engines what an image is about, and help it rank in image search results.</div>
        </div>
      )}
    </ul>

      {Array.isArray(datas.images) &&
        datas.images.map((image, index) => (
          <>
          <div class="card mb-2 shadow">
          <div class="card-body" key={index}>{image}</div> 
         </div>
          </>
        ))}

        <div className='des mx-5'>
            <div className='first'>
              <div className='bold'>What it is</div>
              <div className='p'>Alternate Image Text or Alt Text is descriptive text that is displayed in place of an image if it can't be loaded, as well as a label on an image when it is moused over in the browser, to give more information to the visitor. Additionally, Search Engines use provided Alt Text to better understand the content of an image. Image SEO is not widely known, but having your image rank for image searches is an overlooked way of gaining traffic and backlinks to your site.</div>
            </div>

            <div className='first'>
              <div className='bold'>How to fix it</div>
              <div className='p'>We recommend adding useful and keyword rich Alt Text for pages's main images, in particular those that could have ranking potential. This should be considered on a case-by-case basis. Often there may be imagery such as UI components or tracking pixels where it may not be useful to add Alt Text, though we have tried to filter a number of these out in our analysis.</div>
            </div>
        </div>

        <footer className='ft mt-5'>
          <div>
          <img src={logo} alt="logo" className='emg'/>
          </div>
          <div>
            <p>© 2023 MZ Digital Media | All Rights Reserved</p>
          </div>
        </footer>

    </div>
  );
}

export default App;
