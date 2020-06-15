import React, {useState, useEffect} from 'react';
import Post from './Post';
import Masonry from 'react-masonry-component';
import './App.css';

const App = () => {

  let subreddit = ""
  let limit = 10;

  const[posts, setPosts] = useState([]);
  const[search, setSearch] = useState("");

  const getPosts = async () => {

    const url = `https://www.reddit.com/search.json?q=${subreddit}&sort=new&limit=${limit}`;
    
    console.log(url);

    fetch(url)   //gets the required subreddit, number of posts and sorts by most recent
    .then(res => res.json())                //converts the result to json format
    
    .then( data => {
      data = data.data.children.map(data => data.data);
      console.log(data);
      setPosts(data);
      

    })

    .catch(err => console.log(err));

  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSubreddit = e => {
    e.preventDefault();
    subreddit = search;
    console.log("Search: " + subreddit);
    getPosts();
    // setSearch("");
  };



  return(
    <div className="App">
      <div className="heading-search-div">
      <h1 className="subr-heading">SUBR</h1>
      <form className="search-form" onSubmit={getSubreddit}>
        <input className="search-bar"
               type="text"
               placeholder="Search..."
               onChange={updateSearch}
               value={search}
        />
              
        <button className="search-button" type="submit"/>
        
      </form>
      </div>
      <div className="posts-display">
        <Masonry updateOnEachImageLoad={true}
                enableResizableChildren={true}>
                
          {posts.map(post =>
            <Post key={post.id} 
                  title={post.title}
                  text={post.selftext}
                  author={post.author}
                  score={post.score} 
                  posthint={post.posthint}
                  image={post.preview ? 
                    post.preview.images[0].source.url.split('amp;').join(''):''}
            />
          )} 
        </Masonry>
      </div>
                
    </div>
    
  )
}

export default App;