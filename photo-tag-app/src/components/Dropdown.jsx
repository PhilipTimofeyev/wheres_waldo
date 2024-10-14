import React from 'react'
import styles from './Dropdown.module.css'

function Dropdown(props) {

    function handleClick(e) {
        console.log(e.target.innerText)
    }

    const characterList = props.characters.map(character => 
        <li onClick={handleClick} key={character.id} className={styles.character}>{character.name}</li>
    )

    return (
        <div className={styles.dropdown}>
            <ul className={styles.characterList}>
                {characterList}
            </ul>
        </div>
    )
}

export default Dropdown
