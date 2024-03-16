export default function SearchSource(props) {
    return (
        <div className="search">
            <button>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input className="search-bar" onChange={props.search} type="text" placeholder="Search Sources" />
        </div>
    )
}