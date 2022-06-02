import React from 'react';
import { Link } from 'react-router-dom';
import ArticlePagination from './ArticlePagination';
import UserArticle from './UserArticle';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profile: {},
      user: "",
      articles: [],
      articlesCount: null,
      articlesPerPage: 10,
      activePage: 1,
      feedSelected: 'author',
      following: '',
      error: '',
    };
  }

  getProfile = ({ username = "" } = {}) => {
    this.setState({ loading: true })
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/profiles/${username}`)
      .then((res) => res.json())
      .then(({ profile }) => this.setState({ profile }))
      .finally(() => this.setState({ loading: false }))
  }

  componentDidMount() {
    const { match: { params: { id = '' } = {} } = {} } = this.props || {};
    this.getProfile({ username: id });
  }

  handleClick = ({ target }) => {
    let { id } = target.dataset;
    this.setState({ activePage: id }, this.getArticlesFeed)
  };

  updateCurrentPage = (index) => {
    this.setState({ activePage: index }, this.getArticlesFeed);
  };


  getArticlesFeed = ({ username = "" } = {}) => {
    // this.setState({username:this.state.user});
    // let { username } = this.state.user;
    let offset = (this.state.activePage - 1) * 10;

    let c;
    try {
      c = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      c = {};
    }

    const { token = '' } = c || {};

    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?${this.state.feedSelected}=${username}&
    limit=${this.state.articlesPerPage}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
          'Content-type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then(({ errors }) => {
              return (errors);
            });
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch Articles' });
      });
  };

  handleFollow = () => {
    this.getProfile();
    // this.setState({username:this.state.user});
    let { username } = this.state.user;
    let { following } = this.state;
    let method = following ? 'DELETE' : 'POST';

    let c;
    try {
      c = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      c = {};
    }

    const { token = '' } = c || {};

    fetch(`https://mighty-oasis-08080.herokuapp.com/api/profiles/${username}/follow`, {
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
      .then(({ profile }) => {
        console.log(profile);
        this.setState({ following: profile.following });
      })
      .catch((err) => console.log(err));
  };

  handleFavorite = ({ target }) => {
    let { id, slug } = target.dataset;
    let method = id === 'false' ? 'POST' : 'DELETE';
    // console.log(method);
    // console.log(id, slug);
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
      .then((data) => {
        this.getArticlesFeed();
      })
      .catch((err) => console.log(err));
  };

  render() {
    let profile = this.state.profile;
    let { articles, articlesCount, articlesPerPage, activePage,
      feedSelected, following, error } = this.state;
    return (
      <>
        <div>
          <header className="profile-header">
            <div>
              <img className="profile-img" src={profile.image} alt={profile.username} />
            </div>
            <div className="profile-user">
              {profile.username}
            </div>
            <div className="profile-bio">
              {profile.bio}
            </div>
            <div className="edit-profile">
              <button onClick={this.handleFollow}>
                <i className={!following ? "fas fa-plus mr-2" : "fas fa-minus mr-2"}></i>  {!following ? 'follow' : 'unfollow '}  {profile.username}
              </button>
            </div>
          </header>
          <div className="edit-profile">
            <Link to="/settings">
              <button>
                <i className="fas fa-user-edit mr-2"></i>  Edit Profile
              </button>
            </Link>
          </div>
          <article>
            <div>
              <span className={feedSelected === 'author' ? "active" : ""}
                onClick={() => this.setState({ feedSelected: 'author', activePage: 1 },
                  this.getArticlesFeed)}>
                <div className="feed">
                  My Article
                </div>
              </span>
              <span className={feedSelected === 'favorited'} onClick={() => this.setState({ feedSelected: 'favorited', activePage: 1 }, this.getArticlesFeed)}>
                <div className="feed" to="/">
                  Favorited Articles
                </div>
              </span>
            </div>
            <div>
              <UserArticle
                articles={articles}
                error={error}
                handleFavorite={this.handleFavorite}
                {...this.props}
              />
            </div>
          </article>
          <div>
            <ArticlePagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePage={activePage}
              handleClick={this.handleClick}
              updateCurrentPage={this.updateCurrentPage}
            />
          </div>
        </div >
      </>
    )
  }
}





