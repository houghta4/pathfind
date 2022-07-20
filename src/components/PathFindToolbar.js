import AlgEnum from "../constants/AlgEnum";
const PathFindToolbar = ({ onSearch, setAlg, onClear, onRandomWalls}) => {

    return (
        <section className="toolbar">
            <div className="container">
                <div className="justify-content-between">
                    <ul className="toolrow d-flex flex-column flex-lg-row">
                        <li className="d-flex flex-column flex-md-row">
                            <h5>Show animations&nbsp;&nbsp;</h5>
                            <label className="checkBox">
                                <input 
                                    type="checkbox"
                                    defaultChecked={true}
                                />
                                <span className="switch"></span>
                            </label>
                        </li>
                        {/* TODO make select larger/better looking */}
                        <li className="d-flex flex-column flex-md-row ml-sm-5 ">
                            <strong>Algorithm:&nbsp;&nbsp;</strong>
                            <label className="dropdown">
                                <select className="form-select algorithm dropdown-toggle"
                                    onChange={(e) => setAlg(e.target.value)}
                                    defaultValue={AlgEnum.None}>
                                        <option value={AlgEnum.None} disabled>--</option>
                                        <option value={AlgEnum.A_STAR}>A*</option>
                                        <option value={AlgEnum.DFS}>Dfs</option>
                                    </select>
                            </label>
                        </li>
                        <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                            {/* TODO make button better */}
                            <button type="button" onClick={onSearch}>Search</button>
                        </li>
                        <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                            <button type="button" onClick={onClear}>Clear</button>
                        </li>
                        <li className="d-flex flex-column flex-md-  row ml-sm-5 ml-0">
                            <button type="button" onClick={onRandomWalls}>Randomize Walls</button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default PathFindToolbar;