import AlgEnum from "../constants/AlgEnum";
import Button from 'react-bootstrap/Button';

const PathFindToolbar = ({ onSearch, setAlg, onClear, onRandomWalls, onClearWalls }) => {

    return (
        <div className="toolbarContainer">
            <div className="justify-content-between">
                <ul className="toolbarRow d-flex flex-column flex-lg-row">
                    <li className="toolbarItem d-flex flex-column flex-md-row">
                        <h5>Show animations&nbsp;&nbsp;</h5>
                        <label className="checkBox">
                            <input
                                type="checkbox"
                                defaultChecked={true}
                            />
                            <span className="switch"></span>
                        </label>
                    </li>

                    <li className="toolbarItem d-flex flex-column flex-md-row">
                        <h5>Algorithm&nbsp;&nbsp;</h5>
                        <label className="dropdown">
                            <select className="form-select algorithm dropdown-toggle"
                                onChange={(e) => setAlg(e.target.value)}
                                defaultValue={AlgEnum.None}>
                                <option value={AlgEnum.None} disabled>--</option>
                                <option value={AlgEnum.A_STAR}>A*</option>
                                <option value={AlgEnum.DFS}>Dfs</option>
                            </select>
                        </label>
                        <Button type="button" className="my-btn btn-green ms-2" onClick={onSearch}>Search</Button>
                    </li>

                    <li className="toolbarItem d-flex flex-column flex-md-row">
                        <Button type="button" variant="secondary" className="my-btn" onClick={onClear}>Clear Path</Button>
                        <Button type="button" variant="secondary" className="my-btn ms-2" onClick={onClearWalls}>Clear Walls</Button>
                    </li>
                    <li className="toolbarItem d-flex flex-column flex-md-row">
                        <Button type="button" className="my-btn" variant="dark" onClick={onRandomWalls}>Randomize Walls</Button>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default PathFindToolbar;