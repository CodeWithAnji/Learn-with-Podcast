import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Home from './Components/Home';
import Episodes from './Components/Episodes';



function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);



  useEffect(() => {
    // On component mount, check if there's a user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const handleCallBack = (res) => {
    let user = jwtDecode(res.credential);
    setUser(user);
    setLoggedIn(true);

    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    setUser({});

    localStorage.removeItem('user');
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: "889404558203-pobnjnnrrbjmrgeeefht1h267b0lv2v7.apps.googleusercontent.com",
      callback: handleCallBack,
    });
    google.accounts.id.renderButton(
      document.getElementById("SignIn"),
      { theme: "outline", size: "large" }
    );
  }, [loggedIn]);
  const rssFeed = "https://cdn.atp.fm/rss/public?m2swoudx";
  useEffect(() => {
    fetch(rssFeed)
      .then(res => res.text())
      .then(str => {
        const parser = new window.DOMParser();
        const data = parser.parseFromString(str, "text/xml");
        const itemList = data.querySelectorAll("item");
        const items = [];
        itemList.forEach(el => {
          items.push({
            title: el.querySelector("title").innerHTML,
            pubDate: new Date(el.querySelector("pubDate").textContent).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
            mp3: el.querySelector("enclosure").getAttribute("url"),
            link: el.querySelector("link").innerHTML
          })
        })

        setData(items)
      })
  }, [rssFeed])

  return (
    <div>

      <Home loggedIn={loggedIn} handleLogOut={handleLogOut} user={user} />
      {loggedIn ? (
        <div className='pl-4 py-4  mx-auto'>

          <h2 className='text-2xl font-medium'>Accidental Tech Podcast</h2>
          {data.map((ep, i) =>
            <Episodes key={i}
              title={ep.title}
              pubDate={ep.pubDate}
              link={ep.link}
              mp3={ep.mp3}
            />

          )}
        </div>) : null
        }

    </div>


  );
}

export default App;
