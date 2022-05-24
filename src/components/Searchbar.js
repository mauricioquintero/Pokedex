import React from "react";

const { useState } = React;


const Searchbar = (props) => {
    const { onSearch } = props;

    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onSearch(null);
        }
    }

    const onClick = async (e) => {
        onSearch(search);
    }


    return (
        <div className=" grid justify-center m-0 m-auto p-5">
            <div className=" bg-white mr-5 space-x-4">
                <input className=" p-2 shadow-gray-400 shadow-sm rounded" placeholder="Search Pokemon" onChange={onChange}/>
                <button className=" p-2 bg-customGray text-white shadow-gray-400 shadow-sm rounded" onClick={onClick}>🔍</button>
            </div>
        </div>
    )
}

export default Searchbar;