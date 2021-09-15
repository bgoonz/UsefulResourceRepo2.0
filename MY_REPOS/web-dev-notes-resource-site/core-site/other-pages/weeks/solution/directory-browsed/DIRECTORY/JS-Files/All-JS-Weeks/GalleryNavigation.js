import React from 'react'
import { NavLink } from "react-router-dom";

function GalleryNavigation(props) {
    let galleries = props.galleries.map((g) => <NavLink to={`/gallery/${g}`} style={{padding: '2px'}} activeStyle={{color: 'red'}} key={g}>{g}</NavLink>);

    return (
        <>
            <h1>Galleries</h1>
            {galleries}
        </>
    )
}

export default GalleryNavigation;