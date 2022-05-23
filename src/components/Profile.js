import React from 'react';
import { Link } from 'react-router-dom';
import ArticlePagination from './ArticlePagination';
import Article from './Article';
// import Loader from "./Loader"

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profile: {},
      // username: "",
      // image: "",
      // bio: "",

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

  render() {
    let profile = this.state.profile;
    // if (!this.state.user) {
    //   return <Loader />
    // }
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
          {/* {loggedInUser && loggedInUser !== username && ( */}


          {/* {loggedInUser && loggedInUser === username && ( */}
          <div className="edit-profile">
            <Link to="/setting">
              <button>
                <i className="fas fa-user-edit mr-2"></i>  Edit Profile
              </button>
            </Link>
          </div>
          {/* )} */}



          {/* <div className="feed-card">
            <h6 onClick={() => this.removeTag}>
              
                My Articles
              </Link>
            </h6>
            {/* {this.state.activetag && ( */}
          {/* <h6>
                
                  Favorited 
                </Link>
              </h6> */}
          {/* {/* )}  */}
          {/* </div>  */}

          <article>
            <div>
              <span className={feedSelected === 'author' ? "active" : ""} onClick={() => this.setState({ feedSelected: 'author', activePage: 1 }, this.getFeedArticles)}>
                {/* <i className="fas fa-newspaper mr-2"></i> */}
                <div className="feed">
                  My Article
                </div>
              </span>
              <span className={feedSelected === 'favorited'} onClick={() => this.setState({ feedSelected: 'favorited', activePage: 1 }, this.getFeedArticles)}>
                {/* <i className="fas fa-newspaper mr-2"></i> */}
                <div className="feed" to="/">
                  Favorited Articles
                </div>
              </span>
            </div>
            <div>
              <Article
                articles={articles}
                error={error}
                handleFavorite={this.handleFavorite}
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





