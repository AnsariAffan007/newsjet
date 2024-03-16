export default function Card(props) {

  return (
    <div className="card">
      <img
        src={props.image}
        alt="Couldn't load"
      />
      <h2 className="source-heading">{props.source}</h2>
      <div className="title">
        {props.title.slice(0, 100)} ...
      </div>
      <a href={props.url} target="_blank" className="read-more">Read More &#8594;</a>
    </div>
  );
}
