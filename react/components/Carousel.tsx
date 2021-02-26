import React, {FunctionComponent, MouseEventHandler, useEffect} from "react";
import styles from "../styles.css";
import {IoClose} from "react-icons/all";

interface Carousel {
    onClick: any,
    url?: string
}

const Carousel: FunctionComponent<Carousel> = ({onClick, url}) => {
    console.log(onClick);
    console.log(url);

    useEffect(() => {
        console.log('action going in CAROUSEL');
    });

    return (
        <div id={`${styles.netreviews_media_modal}`}>
            <span className={`${styles.close_carousel}`}><IoClose/></span>

            <div className={`${styles.netreviews_media_content}`}>
                <img id={`${styles.netreviews_media_image}`} src={onClick[1]} alt={'product image'}/>
                {/*<span onClick={onClick}><CgClose/></span>*/}

            </div>
        </div>
    )
}

export default Carousel
