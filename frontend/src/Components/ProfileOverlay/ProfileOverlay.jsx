import React from "react";


const ProfileOverlay = ({ toggleProfile, selectedUser }) => {

    return (
        <div className="profile-pane">
            <button className="close" onClick={toggleProfile}>✖</button>
            <img src={selectedUser.avatar} alt="avatar" />
            <div className="profile-container">
                <div className="profile-header">{selectedUser.name}</div>
                <div className="profile-content-container">
                    <div>{selectedUser.phone}</div>
                    <div>{selectedUser.email}</div>
                </div>
            </div>
            <div className="separator" />
        </div>
    )
}

export default ProfileOverlay;