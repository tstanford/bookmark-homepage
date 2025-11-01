export default function PageHeading({ adminMode, editMode, toggleEditMode, downloadExportFile, inputFile, uploadImportFile, selectedImportFile, deleteAll, logout }) {
    return (
        <heading>
            <div className="logo"></div>
            <div className="date">{new Date().toDateString()}</div>

            <div class="buttons">
                {!adminMode && 
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
                            <button role="actionbutton">
                                <span className="material-symbols-outlined" onClick={logout}>logout</span>
                            </button>
                        </div>

                        <div className="actionbutton exportfile">
                            <button role="actionbutton">
                                <span className="material-symbols-outlined" onClick={downloadExportFile}>download</span>
                            </button>
                        </div>

                        <div className="actionbutton importfile">
                            <input type='file' id='file' ref={inputFile} onChange={uploadImportFile} accept=".yaml" style={{ display: 'none' }} />
                            <button role="actionbutton">
                                <span className="material-symbols-outlined" onClick={selectedImportFile}>upload</span>
                            </button>
                        </div>

                        <div className="actionbutton deleteAll">
                            <button role="actionbutton">
                                <span className="material-symbols-outlined" onClick={deleteAll}>clear_all</span>
                            </button>
                        </div>
                    </>
                }
            </div>
        </heading>
    )
}