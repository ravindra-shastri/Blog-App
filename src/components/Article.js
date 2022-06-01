import React from 'react';
import Comments from "../components/Comments";
import { Link } from 'react-router-dom';
// let articleURL = "https://mighty-oasis-08080.herokuapp.com/api/";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      articles: [],
      articlesCount: 0,
      activePage: 1,
      slug: ''
    }
  }

  getArticle = ({ slug = '' } = {}) => {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then(({ article }) => this.setState({ article }))
  }

  componentDidMount() {
    const { params } = this.props.match || {};
    console.log(this.props.match)
    this.setState({ ...this.state, slug: params.slug });
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
            <div>
              <header className="article-header">
                <div className="article-header-content">
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
                          <Link className="link" to={`/profiles/${article.author.username}`}>
                            <h2 className="author-name">
                              {article.author.username}
                            </h2>
                          </Link>
                          {/* <p className="article-date">
                            {this.getDate(article.createdAt)}
                          </p> */}
                        </div>
                      </div>
                      : ""
                  }
                </div>
              </header>
              <div className="article-header-content">
                <div>
                  <p className="article-body"> {article.body} </p>
                </div>
                <div>
                  <p className="art-taglist">
                    {article.tagList}
                  </p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="">
                {
                  this.state.slug &&
                  <Comments slug={this.state.slug} />
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
