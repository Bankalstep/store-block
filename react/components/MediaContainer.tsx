import React, {FunctionComponent} from "react";

export interface MediaContainer {
    medias: String
}

const MediaContainer: FunctionComponent<MediaContainer> = ({medias}) => {
    return (
        <div>
            {
                medias ? medias : undefined
            }
        </div>
    );
}

export default MediaContainer
