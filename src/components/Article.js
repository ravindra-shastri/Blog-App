import React from 'react';
import { Link } from 'react-router-dom';
// import ArticlePagination from "./ArticlePagination";

// let articleURL = "https://mighty-oasis-08080.herokuapp.com/api/";

// const LIMIT = 10;

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      articles: [],
      articlesCount: 0,
      activePage: 1
    }
  }

  getArticle = ({ slug = '' } = {}) => {
    // `https://mighty-oasis-08080.herokuapp.com/api/articles/hey-i-am-slug`
    // fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}?limit=1&offset=1`)
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then(({ article }) => this.setState({ article }))
  }

  componentDidMount() {
    const { params } = this.props.match || {};
    this.getArticle(params)
  }

  getDate(date) {
    let newdate = new Date(date).toISOString().split("T")[0];
    return newdate;
  }

  handleCurrentPage = (index) => {
    this.setState({
      activePage: index
    })
  }

  render() {
    const { article = { author: {} } } = this.state || {};
    return (
      <>
        <div>
          <div className="author-container">
            <div className="">
              <header className="article-header">
                <div>
                  <h2 className="article-author-name">
                    {article.title}
                  </h2>
                  {
                    article.author ?
                      <div className="author-img-content">
                        <div>
                          <img
                            className="author-img"
                            src={article.author.image}
                            alt="author"
                          />
                        </div>
                        <div>
                          <Link to={`/profile/${article.author.username}`}>
                            <h2 className="author-name">
                              {article.author.username}
                            </h2>
                          </Link>
                          <p className="article-date">
                            {/* {this.getDate(article.createdAt)} */}
                          </p>
                        </div>
                      </div>
                      : <></>
                  }

                </div>
              </header>
              <div>
                <p> {article.body} </p>
              </div>
              <div>
                <p className="taglist">
                  {article.tagList}
                </p>
              </div>
              <hr className="hr-line" />
            </div>
          </div>
        </div>
      </>
    )
  }
}