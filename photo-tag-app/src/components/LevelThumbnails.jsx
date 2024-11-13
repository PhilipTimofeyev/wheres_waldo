import React from 'react'
import { Link } from "react-router-dom";

function LevelThumbnails({ levels }) {

    const thumbnails = levels.map(picture =>
        <li key={picture.id}>
            <div className='levelTiles'>
                <Link to={`/level/${picture.id}`}>
                    <img src={picture.image} />
                </Link>
                <h3>{picture.title}</h3>
            </div>
        </li>
    )

    return (
        <div className='levelsGrid'>
            {thumbnails}
        </div>
    )
}

export default LevelThumbnails
