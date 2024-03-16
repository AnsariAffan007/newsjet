import { v4 as uuid } from "uuid";

export default function Select(props) {
    return (
        <select value={props.value} onChange={props.onChange}>
            {props.array.map((element, index) => {
                return (
                    <option key={uuid()} value={element.toLowerCase()}>{element}</option>
                )
            })}
        </select>
    )
}