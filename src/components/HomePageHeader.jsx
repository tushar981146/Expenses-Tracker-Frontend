import React from 'react'

function HomePageHeader() {
    return (
        <div className="window-header">
            <div className="window-header__inner">
                {/* Traffic light buttons */}
                <div className="window-header__controls">
                    <div className="window-header__dot window-header__dot--red"></div>
                    <div className="window-header__dot window-header__dot--yellow"></div>
                    <div className="window-header__dot window-header__dot--green"></div>
                </div>
                {/* Updated title in the bezel */}
                <div className="window-header__title">WalletWise - Dashboard</div>
                <div className="window-header__spacer"></div> {/* Spacer */}
            </div>
        </div>
    )
}

export default HomePageHeader
