import React from 'react';
const ShowCom = props => {
    console.log('ShowCom loaded ------------------');
    return (
        <div>
            你好，{props.name}
        </div>
    )
}

export default ShowCom;