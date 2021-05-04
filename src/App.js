import React, {useState, useEffect} from 'react';
import Post from './Post';
import Masonry from 'react-masonry-component';
import './App.css';

const App = () => {

  let subreddit = "";

  const[origPosts, setOrigPosts] = useState([]);
  const[posts, setPosts] = useState([]);
  const[search, setSearch] = useState("");
  const[limit] = useState(50);
  const[disableButtons, setDisableButtons] = useState(true);

  const getPosts = async () => {

    const url = `https://www.reddit.com/search.json?q=${subreddit}&sort=new&limit=${limit}`;
    
    console.log(url);

    fetch(url)   //gets the required subreddit, number of posts and sorts by most recent
    .then(res => res.json())                //converts the result to json format
    
    .then( data => {

      data = data.data.children.map(data => data.data);
      console.log(data);
      setOrigPosts(data); 
      setPosts(data.slice(0, 10));

    })

    .catch(err => console.log(err));

  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSubreddit = async e => {
    e.preventDefault();
    setDisableButtons(false);
    subreddit = search;
    await getPosts();
  };

  const pageSelect = (page) => {

    var start = (page-1)*10
    setPosts(origPosts.slice(start, start+10));
    window.scroll(0, 0)
  }

  // useEffect(() => {
  //   getSubreddit()
  // }, [limit] )

  return(
    <div className="App">
      <div className="heading-search-div">
      <h1 className="subr-heading">SUBR</h1>
      <form className="search-form" onSubmit={getSubreddit}>
        <input className="search-bar"
               type="text"
               placeholder="Search for a Subreddit here!"
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
                  url={post.url}
                  posthint={post.posthint}
                  image={post.preview ? 
                    post.preview.images[0].source.url.split('amp;').join(''):''}
            />
          )} 
        </Masonry>
      </div>
      <form hidden={disableButtons} className="page-buttons">
        Page 
        <button className="b1" type="button" onClick={() => pageSelect(1)}>1</button> 
        <button className="b2" type="button" onClick={() => pageSelect(2)}>2</button> 
        <button className="b3" type="button" onClick={() => pageSelect(3)}>3</button> 
        <button className="b4" type="button" onClick={() => pageSelect(4)}>4</button> 
        <button className="b5" type="button" onClick={() => pageSelect(5)}>5</button>     
      </form>
    </div>
    
  )
}

export default App;