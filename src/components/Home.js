import React from 'react';
import Tags from "../components/Tags";
import Comments from "../components/Comments";
import ArticlePagination from "./ArticlePagination";
import { Link } from 'react-router-dom';
// import {Route,Redirect} from 'react-router-dom';

const LIMIT = 10;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesCount: 0,
      activePage: 1,
      activetag: ""
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

  removeTag = () => {
    this.setState({ activetag: "" })
  }
  selectedTag = activetag => this.setState({ activetag })

  render() {
    return (
      <>

        <div className="header-container">
          <h2 className="header">
            Welcome to Blog App <br />
            <span className="header-span"> A place to share your knowledge.</span>
          </h2>
        </div>
        <div className="article-tag-container">
          <div className="article-display-card">
            <div className="feed-card">
              <h6 onClick={() => this.removeTag}>
                <Link className="feed" to="/">
                  Global Feed
                </Link>
              </h6>
              {this.state.activetag && (
                <h6>
                  <Link className="feed" to="/">
                    # {this.state.activetag}
                  </Link>
                </h6>
              )}
            </div>
            <hr className="feed-hr-line" />
            {this.state.articles.map((article) =>
              <div className="author-container">
                <div className="author-img-container">
                  <div>
                    <Link className="link" to={`/profiles/${article.author.username}`}>
                      <button className="author-img-content-home">
                        <div>
                          <img
                            className="author-img"
                            src={article.author.image}
                            alt="author"
                          />
                        </div>
                        <div className="author-name-date">
                          <h2 className="home-author-name">
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
                <Link className="link" to={`/articles/${article.slug}`}>
                  <button className="author-description-btn-home">
                    <div className="author-desc">
                      <h2 className="author-title">
                        {article.title}
                      </h2>
                      <p className="author-description">
                        {article.description}
                      </p>
                    </div>
                    <div className="read-more-content">
                      {/* <Link className="link" to="/articles"> */}
                      <p className="read-more-btn">
                        Read More ...
                      </p>
                      {/* </Link> */}
                      <p className="taglist">
                        {article.tagList}
                      </p>
                      <div>
                        <Comments />
                      </div>
                    </div>
                  </button>
                </Link>
                <hr className="hr-line" />
              </div>
            )
            }

          </div>

          <div>
            <Tags getArticles={this.getArticles} selectedTag={this.selectedTag} />
          </div>
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


