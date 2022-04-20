import React from 'react';
import Loader from "../components/Loader";
// import { Link } from 'react-router-dom';

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
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({ tags: tags, error: "" });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch data" });
      });
  }

  selectTag = (tag) => {
    console.log(tag)
    this.setState({ selectedtags: tag }, () => this.props.getArticles({ tag }))
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


