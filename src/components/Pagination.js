import React from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

const Pagination = (props) => {
    const {onLeftClick, onRightClick, page, totalPages} = props;
    
    return (
        <div className=" flex flex-row items-center space-x-1">
            <button>
                <div className=" text-customGray text-3xl" onClick={onLeftClick}>
                    <BsFillArrowLeftCircleFill/>
                </div>
            </button>
            <div>{page}/{totalPages}</div>
            <button>
                <div className=" text-customGray text-3xl" onClick={onRightClick}>
                    <BsFillArrowRightCircleFill/>
                </div>
            </button>
        </div>
    )
}

export default Pagination;