import React, {FunctionComponent, Fragment} from "react";
import styles from "../styles.css";
import ModerationBlock from "./Moderation";

export interface ModerationContainer {
    moderation: Moderation[]
    commentUsername: any
}

interface Moderation {
    comment_date: string
    comment_origin: number
    comment: string
    username: string
}


const ModerationContainerBlock: FunctionComponent<ModerationContainer> = ({moderation, commentUsername}) => {
    const chat = moderation.slice().reverse();

    function toggleChat(){

    }

    return (
        <Fragment>
            {chat.map((element, i) => {
                return <ModerationBlock comment_date={element.comment_date}
                                        comment={element.comment}
                                        comment_origin={element.comment_origin}
                                        commentUsername={commentUsername}
                                        key={i}/>
            })}
        </Fragment>
    )
}

export default ModerationContainerBlock
