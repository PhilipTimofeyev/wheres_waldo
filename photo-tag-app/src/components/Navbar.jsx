import { React} from 'react'
import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Navbar