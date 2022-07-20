const Header = ({theme, setTheme}) => {
    return (
        <div className="headerContainer">
            <div className="d-flex justify-content-between">
                <div>
                    <img alt="Placeholder"
                        src={process.env.PUBLIC_URL + "favicon.ico"} />
                </div>
                {/* TODO add these classes later */}
                <div className="light header-title"> 
                    <h4>Vince pathfinding app alpha</h4>
                </div>
                <div className= {
                    theme === "light" ? "" : "text-info"
                }>
                    Username &nbsp;&nbsp;
                    <span>
                        <a href="#">Log out</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Header;