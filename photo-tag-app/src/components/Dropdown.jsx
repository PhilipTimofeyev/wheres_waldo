import { React, useState } from 'react'
import styles from './Dropdown.module.css'

const DROPDOWN_SIZE = .07

function Dropdown(props) {

    // const [selected, setSelected] = useState([])

    const characterList = props.characters.map(character => {
        let selected = !!props.found.find((char) => Object.values(char).includes(character.id))
        if (selected) {
            return <li key={character.id} className={styles.selected}>{character.name}</li>
        } else {
            return <li onClick={props.handleSelection} key={character.id} className={styles.character}>{character.name}</li>
        }
    })

    return (
            <div className={styles.dropdown} style={{ width: props.bounds.width * DROPDOWN_SIZE }}>
                <ul className={styles.characterList}>
                    {characterList}
                </ul>
            </div>
    )
}

export default Dropdown
