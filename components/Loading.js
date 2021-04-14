import React from 'react'
import loadingGif from '../public/assets/gif/loading-arrow.gif'

export default function Loading() {
    return (
        <div className="loading">
            <img src={loadingGif} alt=""/>
            <h4>Properties loading ...</h4>
        </div>
    )
}
