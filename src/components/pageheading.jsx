export default function PageHeading({ editMode, toggleEditMode, downloadExportFile, inputFile, uploadImportFile, selectedImportFile, deleteAll }) {
    return (
        <heading>
            <div className="logo"></div>
            <div className="date">{new Date().toDateString()}</div>

            <div class="buttons">
                <div id="editSwitch">
                    <label className="switch">
                        <input type="checkbox" checked={editMode} onChange={toggleEditMode} />
                        <span className="slider round"></span>
                    </label>
                </div>

                {editMode &&
                    <>
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