import Card from "./Card";
import { v4 as uuid } from "uuid";

export default function CardContainer(props) {


  return (
    <>
      <div className="card-container" data-testid='card-container'>
        {props.articles.map((article, index) => {
          {/* console.log(article.source); */ }
          return (
            <Card
              key={uuid()}
              image={(article.urlToImage !== undefined) ? article.urlToImage : ""}
              source={(article.source.name !== undefined) ? article.source.name : ""}
              title={article.title}
              url={article.url}
            />

          )
        })}
      </div>
    </>
  );
}
