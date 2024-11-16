// Home.jsx
import React from 'react';

function Home({ loggedIn, handleLogOut, user }) {
  return (
    <div className="home-container">
      {loggedIn ? (
        <>
          <div className="logout-button">
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          <h1 className="greeting">Hi, {user.name}</h1>
        </>
      ) : (
        <div id="SignIn"></div>
      )}
      <h1 className="main-heading">Learn with Podcast</h1>
    </div>
  );
}

export default Home;
