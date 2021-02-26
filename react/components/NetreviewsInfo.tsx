import React, {EventHandler, FunctionComponent, MouseEventHandler, SyntheticEvent, useState} from "react";
import styles from "../styles.css";
import {CgCloseO} from "react-icons/all";

interface TState {
    onClick: MouseEventHandler
}

const NetreviewsInfo: FunctionComponent<TState> = ({onClick}) => {
    return (
        <div id={`${styles.netreviews_informations}`}>
            <span className={`${styles.close_info}`} onClick={onClick}><CgCloseO/></span>
            <ul>
                <li>Pour plus d'informations sur les caractéristiques du contrôle des
                    avis et la possibilité de contacter l'auteur de l'avis, merci de
                    consulter nos
                    <a href="https://www.avis-verifies.com/index.php?page=mod_conditions_utilisation"
                       target="_blank">CGU
                    </a>.
                </li>
                <li>Aucune contrepartie n'a été fournie en échange des avis.</li>
                <li>Les avis sont publiés et conservés pendant une durée de cinq ans.</li>
                <li>Les avis ne sont pas modifiables : si un client souhaite modifier
                    son avis, il doit contacter Avis Vérifiés afin de supprimer l'avis
                    existant, et en publier un nouveau.
                </li>
                <li>Les motifs de suppression des avis sont disponibles
                    <a href="https://www.avis-verifies.com/index.php?page=mod_conditions_utilisation#Rejet_de_lavis_de_consommateur"
                       target="_blank">ici</a>.
                </li>
            </ul>
        </div>
    )
}

export default NetreviewsInfo
