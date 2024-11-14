import { React } from 'react'
import styles from './Characters.module.css'

function Characters({ characters, found }) {
    let classStyle

    const characterList = characters.map(character => {
        if (found.find(char => char.id === character.id)) {
            classStyle = styles.characterFound
        } else {
            classStyle = styles.character
        }

        return (
            <li key={character.id} className={classStyle}>
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