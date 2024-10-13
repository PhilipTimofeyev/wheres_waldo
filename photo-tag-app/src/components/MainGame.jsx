import { React, useState } from 'react'

function MainGame() {

    const [mouseCoord, setMouseCoord] = useState()

    function handleClick(e) {
        const coordX = e.clientX
        const coordY = e.clientY

        setMouseCoord([coordX, coordY])

        console.log([coordX, coordY])
    }

  return (
    <div>
          <img onClick={handleClick}
              src="./src/assets/images/wheres-waldo-beach.jpg"
          />
    </div>
  )
}

export default MainGame
