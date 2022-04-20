import React from 'react';
import Tags from "../components/Tags";
import ArticlePagination from "./ArticlePagination";
import { Link } from 'react-router-dom';

const LIMIT = 10;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesCount: 0,
      activePage: 1
    }
  }

  getArticles = ({ tag = '' } = {}) => {
    const { activePage = 1 } = this.state || {};
    const offset = tag ? 0 : ((activePage - 1) * LIMIT);
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?limit=${LIMIT}&offset=${offset}${tag ? `&tag=${tag}` : ''}`)
      .then((res) => res.json())
      .then(({ articles, articlesCount }) => this.setState({ articles, articlesCount }))
  }

  componentDidMount() {
    this.getArticles()
  }

  getDate(date) {
    let newdate = new Date(date).toISOString().split("T")[0];
    return newdate;
  }

  handleCurrentPage = (index) => {
    this.setState({
      activePage: index
    }, this.getArticles)
  }

  render() {

    return (
      <>
        <div className="article-tag-container">
          <div className="article-display-card">
            <div>
              <h6 className="feed"> Global Feed</h6>
            </div>
            <hr className="feed-hr-line" />

            {this.state.articles.map((article) =>
              <div className="author-container">
                <div className="author-img-container">
                  <div>
                    <Link to={`/profile/${article.author.username}`}>
                      <button className="author-img-content">
                        <div>
                          <img
                            className="author-img"
                            src={article.author.image}
                            alt="author"
                          />
                        </div>
                        <div>
                          <h2 className="author-name">
                            {article.author.username}
                          </h2>
                          <p className="article-date">
                            {this.getDate(article.createdAt)}
                          </p>
                        </div>
                      </button>
                    </Link>
                  </div>
                  <p className="like">
                    <i className="fa-solid fa-heart like-icon">
                    </i>
                  </p>
                </div>
                <Link to={`/articles/${article.slug}`}>
                  <button className="author-description-btn">
                    <div className="author-desc">
                      <h2 className="author-title">
                        {article.title}
                      </h2>
                      <p className="author-description">
                        {article.description}
                      </p>
                    </div>
                    <div className="read-more-content">
                      {/* <Link className="read-more-link" to="/articles"> */}
                      <p className="read-more-btn">
                        Read More ...
                      </p>
                      {/* </Link> */}
                      <p className="taglist">
                        {article.tagList}
                      </p>
                    </div>
                  </button>
                </Link>
                <hr className="hr-line" />
              </div>

            )
            }
          </div>
          <aside>
            <Tags getArticles={this.getArticles} />
          </aside>
        </div>

        <ArticlePagination
          activePage={this.state.activePage}
          totalPage={Math.ceil(this.state.articlesCount / LIMIT)}
          handleCurrentPage={this.handleCurrentPage}
        />
      </>
    )
  }
}




// {/* <div className="header-btn">
//   <Link to="/articles">
//     <button className="btn-primary"> View Articles </button>
//   </Link>
// </div> */}