import { v4 as uuid } from "uuid";
import Select from "./Select";

export default function Navbar(props) {
  let categories = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology"
  ];

  let countries = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]

  return (
    <nav>
      <h2>NewsJet</h2>
      <div>
        <span>Filters : </span>
        <Select value={props.country} onChange={props.onCountryClick} array={countries} />
        <Select value={props.category} onChange={props.onCategoryClick} array={categories} />
      </div>
    </nav>
  );
}
