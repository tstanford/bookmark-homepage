import '../css/pageheading.scss';

export default function PageHeading({ adminMode, editMode, toggleEditMode, downloadExportFile, inputFile, uploadImportFile, selectedImportFile, deleteAll, logout }) {
    return (
        <header>
            <div className="logo"></div>
            <div className="date">{new Date().toDateString()}</div>

            <div className="buttons">

                
                <div className="profile-menu">
                    <div className="profile-header">
                        <img src="https://gravatar.com/avatar/18ead39197cc63882b03a41f0ffeb8a38fd6ed592b9640f8c03e8c2dde4d5173?v=1520101750000&size=64&d=initials" alt="Profile Icon"/>
                        <div class="profile-name">Tim Stanford</div>
                    </div>
                    <ul className="menu-options">
                        <li>Edit mode</li>
                        <li>Import bookmarks</li>
                        <li>Export bookmarks</li>
                        <li className="delete">Delete all!</li>
                    </ul>
                </div>



                {/* {!adminMode && 
                    <div id="editSwitch">
                        <label className="switch">
                            <input type="checkbox" checked={editMode} onChange={toggleEditMode} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                }

                {adminMode &&
                    <div className="actionbutton logout">
                        <button role="actionbutton">
                            <span className="material-symbols-outlined" onClick={logout}>logout</span>
                        </button>
                    </div>
                }

                {!adminMode && editMode &&
                    <>
                        <div className="actionbutton logout">
                            <button role="actionbutton" title="Log out">
                                <span className="material-symbols-outlined" onClick={logout}>logout</span>
                            </button>
                        </div>

                        <div className="actionbutton exportfile">
                            <button role="actionbutton" title="Export your bookmarks">
                                <span className="material-symbols-outlined" onClick={downloadExportFile}>download</span>
                            </button>
                        </div>

                        <div className="actionbutton importfile">
                            <input type='file' id='file' ref={inputFile} onChange={uploadImportFile} accept=".yaml" style={{ display: 'none' }} />
                            <button role="actionbutton" title="Import your bookmarks">
                                <span className="material-symbols-outlined" onClick={selectedImportFile}>upload</span>
                            </button>
                        </div>

                        <div className="actionbutton deleteAll">
                            <button role="actionbutton"  title="Delete all folders and bookmarks">
                                <span className="material-symbols-outlined" onClick={deleteAll}>clear_all</span>
                            </button>
                        </div>
                    </>
                } */}
            </div>
        </header>
    )
}