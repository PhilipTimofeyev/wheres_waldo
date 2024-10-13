import React from 'react'

function MainGame() {

    function handleClick(e) {
        const coordX = e.clientX
        const coordY = e.clientY

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
