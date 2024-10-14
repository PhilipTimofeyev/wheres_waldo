import React from 'react'
import styles from './Dropdown.module.css'

const DROPDOWN_SIZE = .07

function Dropdown(props) {
    const characterList = props.characters.map(character => 
        <li onClick={props.handleSelection} key={character.id} className={styles.character}>{character.name}</li>
    )

    console.log(props.bounds)

    return (
        <div className={styles.dropdown} style={{ width: props.bounds.width * DROPDOWN_SIZE }}>
            <ul className={styles.characterList}>
                {characterList}
            </ul>
        </div>
    )
}

export default Dropdown
