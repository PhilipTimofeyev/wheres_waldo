import { React, useState } from 'react'
import styles from './Dropdown.module.css'

const DROPDOWN_SIZE = .07

function Dropdown(props) {

    const characterList = props.characters.map(character => {
        const selected = !!props.found.find((char) => Object.values(char).includes(character.id))
        if (selected) {
            return (<li key={character.id} className={styles.selected}>
                        <h5>{character.name} </h5>
                        <img src={character.image} />
                    </li>)
        } else {
            return (
                <li onClick={e => props.handleSelection(character.id)} key={character.id} className={styles.character}>
                    <h5>{character.name} </h5>
                    <img src={character.image}/>
                </li>
            )
        }
    })

    return (
        <div className={styles.dropdown}>
            <ul className={styles.characterList}>
                {characterList}
            </ul>
        </div>
    )
}

export default Dropdown
