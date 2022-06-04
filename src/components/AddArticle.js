import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import "../index.css";

export default class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: '',
      body: '',
      error: '',
    }
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    let { title, description, tags, body } = this.state;
    tags = tags.split(',').map((tag) => tag.trim());
    event.preventDefault();
    if (title && description && tags && body) {
      let c;
      try {
        c = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        c = {};
      }
      const { token = '' } = c || {};
      fetch("https://mighty-oasis-08080.herokuapp.com/api/articles", {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList: tags

          },
        }),
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
          this.props.history.push(`/articles/${data.article.slug}`);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            title: '',
            description: '',
            body: '',
            tags: '',
            error: '',
          });
        });
    } else {
      this.setState({
        title: '',
        description: '',
        body: '',
        tags: '',
        error: 'None of the field should be empty',
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      body: text,
    });
  };

  clearEdit = ({ html, text }) => {
    return html = ""
  }

  render() {
    const mdParser = new MarkdownIt();
    return (
      <>
        <div>
          <h2 className="new-article-header">
            Add New Article
          </h2>
          <form
            onSubmit={this.handleSubmit}
            className="new-article-container"
          >
            <input
              type="text"
              placeholder="Enter your Title"
              value={this.state.title}
              name="title"
              onChange={(e) => this.handleChange(e)}
              className="new-article-input"
            />
            <input
              type="text"
              placeholder="Enter Description"
              value={this.state.description}
              name="description"
              onChange={(e) => this.handleChange(e)}
              className="new-article-input"
            />
            <input
              type="text"
              placeholder="Enter Tags"
              value={this.state.tags}
              name="tags"
              onChange={(e) => this.handleChange(e)}
              className="new-article-input"
            />
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={(e) => this.handleEditorChange(e)}
              onSubmit={this.clearEdit}
              className="mdeditor"
            />

            <div className="new-article-btn">
              <input
                type="submit"
                value="Publish Article"
                className="signup-btn"
              />
            </div>
          </form>
        </div>
      </>
    )
  }
}

