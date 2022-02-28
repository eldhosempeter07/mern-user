import React from 'react'

const Loader = ({darkBg}) => {
    return (
        <div className={darkBg ? 'loaderWrapper' : 'loaderWrapper notificationLoader'}>
            <div className="spinnerBox">
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                <div>Loading ...</div>
            </div>
        </div>
    )
}

export default Loader
