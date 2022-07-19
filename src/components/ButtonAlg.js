import React from "react";

const ButtonAlg = ({name, onClick}) => {
    return (
        <button
            onClick={onClick} >
            {name}
        </button>
    );

};



export default ButtonAlg;