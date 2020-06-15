import React, {useState, useEffect} from 'react';
import style from './post.module.css';

const Post = ({title="hi", text="txt", 
               author="me", score,
               image, posthint=""}) => {
                   

    const [postText, setPostText] = useState(text);
    const[hideButton, setHideButton] = useState(false);
    const[show, setShow] = useState("Show more");

    var origText = text;
    var formatted = false;

    const formatText = () => {
        if(text.length > 650){
            setPostText(text.substring(0, 700) + "...");
            formatted = true;
            console.log("formatting...")
        }
        else setHideButton(true);
    }

    const showMore = () => {
        
        if(formatted) {
            setPostText(origText)
            setShow("Show less");
            formatted = false;
        }
        else {
            formatText();
            setShow("Show more");
        }
        
    }

    useEffect(() => {
        formatText();
    }, []);

    return (
        <div className={style.post}>
            <h1 className={style.title}>{title}</h1>
            <div className={style.mainBar}>
                <p className={style.author}>u\{author}</p>
                <p className={style.score}>Score: {score}</p>
            </div>
            <p className={style.text}>{postText}</p>
            <div className={style.showMoreButtonDiv}>
                <button className={style.button} 
                        hidden={hideButton}
                        onClick={showMore}>
                            {show}
                </button>
            </div>
            <img className={style.image} src={image} alt=""/>
            
        </div>
    );
};

export default Post;