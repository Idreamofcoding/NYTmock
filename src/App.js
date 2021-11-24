import React, { useState, useEffect }from 'react';
import "./index.css"

const App = () => {
  const [articles, setArticles] = useState([])
  const [term, setTerm] = useState('election')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    const fetchArticles = async () => {
    try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}
          `)
          const articles = await res.json()
          console.log(articles.response.docs);
          setArticles(articles.response.docs)
      } catch (error) {
      console.error(error);
    }
  }

    fetchArticles()
  }, [])

  return (
    <>
      <div className="showcase">
        <div className="overlay">
          <h1 className="viewArticlesAbout">Viewing articles about {term}</h1>
          {/* form */}
        </div>
      </div>




      <section className="section">
        {articles.map((article) => {
          const {abstract, headline: { main }, byline:{original}, lead_paragraph, news_desk, section_name, web_url, _id, word_count} = article

          return (
            <article key={_id} className="entire-article">
              <h2 className="main-heading-of-article">{main}</h2>
              <p>{abstract}</p>
              <p>{lead_paragraph}</p>
              <ul className="entire-list">
                <li>{original}</li>
                <li><span className="entire-list-items">News Desk:</span>{news_desk}</li>
                <li><span className="entire-list-items">Section Name:</span>{section_name}</li>
                <li><span className="entire-list-items">Word Count:</span>{word_count}</li>
              </ul>
              <a href={web_url} target="_blank" className="underline">
                Web Resource
              </a>
            </article>
          )

        })}
      </section>
    </>
  );
}

export default App;
