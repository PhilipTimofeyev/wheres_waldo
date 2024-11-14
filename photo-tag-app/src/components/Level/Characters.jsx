import { React } from 'react'
import styles from './Characters.module.css'

function Characters({ characters }) {
    const characterList = characters.map(character => {
        return (
            <li key={character.id} className={styles.character}>
                <h5>{character.name} </h5>
                <img src={character.image} />
            </li>
        )
    })

    return (
        <>
            <ul className={styles.characters}>
                <h3>Can you find: </h3>
                {characterList}
                <h3>?</h3>
            </ul>
        </>
    )
}

export default Characters