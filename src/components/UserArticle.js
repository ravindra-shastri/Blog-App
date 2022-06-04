import React from 'react';
import { Link } from 'react-router-dom';
export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesCount: 0,
      activePage: 1
    }
  }

  getArticle = ({ id: userId = '' } = {}) => {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?author=${userId}`)
      .then((res) => res.json())
      .then(({ articles }) => this.setState({ articles }))
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

  handleFavorite = (slug) => {
    console.log(slug)
    let method = slug ? 'POST' : 'DELETE';
    let c;
    try {
      c = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      c = {};
    }
    const { token = '' } = c || {};

    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/favorite`, {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then(({ errors }) => {
              return (errors);
            });
        }
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.articles.map((article) =>
          <div className="author-container">
            <div className="author-img-container">
              <div>
                <Link className="link"
                  to={`/profiles/${article.author.username}`}
                >
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
              <p
                className={"active" ? "active-fav" : "like"}
                onClick={() => this.handleFavorite(article.slug)}
              >
                <i className="fa-solid fa-heart like-icon"></i>
              </p>
            </div>
            <Link className="link"
              to={`/articles/${article.slug}`}
            >
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
                  <p className="read-more-btn">
                    Read More ...
                  </p>
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
      </>
    )
  }
}
