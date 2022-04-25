import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    // fetch(`https://mighty-oasis-08080.herokuapp.com/api/profiles/:username`)
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`)
      .then((res) => res.json())
      .then(({ articles, articlesCount }) => this.setState({ articles, articlesCount }))
  }

  render() {
    return (
      <>
        <div>
          {this.state.articles.map((article) =>
            <div>
              <div className="profile-header">
                <img className="profile-img" src={article.author.image} alt={article.author.username} />
                <h3 className="profile-username "> {article.author.username} </h3>
                <h4 className="profile-bio"> {article.author.bio} </h4>
                <div className="profile-follow-btn">
                  <button>
                    <i className={!article.author.following ? "fas fa-plus" : "fas fa-minus"}></i>
                    {!article.author.following ? "Follow" : "Unfollow"} {article.author.username}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </>
    )
  }
}





