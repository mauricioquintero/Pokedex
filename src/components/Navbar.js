import React from "react";


const Navbar = () => {
    return (
        <div className=" h-24 flex flex-row justify-evenly items-center w-screen bg-red-500 shadow-sm shadow-gray-500">
            <img className=" h-5/6" src={require("../images/pokeball.png")} alt="Pokedex"/>
        </div>
    )
}

export default Navbar;