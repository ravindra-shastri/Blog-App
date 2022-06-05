import React from 'react';
import { Link } from 'react-router-dom';
export default class UserArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesCount: 0,
      activePage: 1
    }
  }

  getArticle = () => {
    const { params: { id: userId } = {} } = this.props.match || {};
    let c;
    try {
      c = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      c = {};
    }
    const { token = '' } = c || {};

    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?author=${userId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ articles }) => this.setState({ articles }))
  }

  componentDidMount() {
    this.getArticle()
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

  handleFavorite = (article) => {
    const { slug, favorited } = article;
    let method = favorited ? 'DELETE' : 'POST';
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
        return this.getArticle()
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.articles.map((article) =>
          <div className="author-container" key={article.slug}>
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
                className="like"
                onClick={() => this.handleFavorite(article)}
              >
                <i className="fa-solid fa-heart like-icon">
                  <span className="like-span"> {article.favoritesCount}</span></i>
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
