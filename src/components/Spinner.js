import loading from "./loader.gif"

export default function Spinner() {
    return (
        <div className="loader" data-testid='loader'>
            <img src={loading} alt="Loading" />
        </div>
    )
}