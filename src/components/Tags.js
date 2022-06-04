import React from 'react';
import Loader from "../components/Loader";
export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      error: "",
      selectedtags: ""
    }
  }
  componentDidMount() {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/tags`)
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then(({ errors }) => {
              return (errors);
            });
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({
          tags: tags,
          error: ""
        });
      })
      .catch((err) => {
        this.setState({
          error: "Not able to fetch Tags"
        });
      });
  }

  selectTag = (tag) => {
    this.setState({ selectedtags: tag }, () => {
      this.props.getArticles({ tag });
      this.props.selectedTag(tag)
    })
  }

  render() {

    let { tags, error } = this.state;
    if (error) {
      return <h4>{error}</h4>;
    }
    if (!tags) {
      return <Loader />;
    }

    return (
      <>
        <aside className="tag-main-container">
          <h6 className="tag-title">
            Popular Tags
          </h6>
          <div className="tag-container">
            {
              tags.map((tag) => {
                if (tag !== "") {
                  return (
                    <span className="tag"
                      key={tag}
                      onClick={(e) => this.selectTag(tag)}
                      value={tag}
                    >
                      {tag}
                    </span>
                  );
                } else {
                  return "";
                }
              })
            }
          </div>
        </aside>
      </>
    );
  }
}


