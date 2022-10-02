import React from 'react';

function  Button ({children, type, disabled, clickHandler}) {
    return (
        <Button
            type={type}
            disabled={disabled}
            onClick={clickHandler}>
            {children}
        </Button>
    );
}

export default Button;
