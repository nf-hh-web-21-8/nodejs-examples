import React from "react";

const Header = ({children, ...rest}) => {
    return <div {...rest}>{children}</div>
}

export default Header