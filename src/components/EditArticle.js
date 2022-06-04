import React from 'react';
export default class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      errors: ''
    };
  }

  getArticle = ({ slug = '' } = {}) => {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then(({ article }) => this.setState({ article }))
  }

  componentDidMount() {
    const { params } = this.props.match || {};
    this.setState({ ...this.state, slug: params.slug });
    this.getArticle(params);
  }



  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({
      article: {
        [name]: value
      }
    });
  };

  handleSubmit = (event) => {
    let { title, description, tags, body }
      = this.state;
    event.preventDefault();
    if (title && description && tags && body) {
      let c;
      try {
        c = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        c = {};
      }
      const { token = '' } = c || {};
      const { article: { slug = '' } = {} } = this.state;

      fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`, {
        method: 'PUT',
        body: JSON.stringify({
          article: {
            title, description, body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        }),
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
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
        .then(({ data }) => {
          this.props.history.push(`/articles/${slug}`)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ error: 'Enter all fields' });
    }
  };

  render() {
    let { article: { title, description, tags, body } = {} }
      = this.state;
    return (
      <form>
        <fieldset className="update-article">
          <input
            className="edit-article"
            type="text"
            value={title}
            name="title"
            placeholder="Article Title"
            onChange={this.handleChange}
          />
          <input
            className="edit-article"
            type="text"
            value={description}
            name="description"
            placeholder="What about this article?"
            onChange={this.handleChange}
          />
          <textarea
            className="edit-article"
            rows="5"
            name="body"
            value={body}
            placeholder="Write your article"
            onChange={this.handleChange}
          >
          </textarea>
          <input
            className="edit-article"
            type="text"
            value={tags}
            name="tags"
            placeholder="Enter tags"
            onChange={this.handleChange}
          />
          <div className="update-article-btn-content">
            <input
              className="update-article-btn"
              type="submit"
              value="Update Article"
              onSubmit={this.handleSubmit}
            />
          </div>
        </fieldset>
      </form>
    )
  }
}