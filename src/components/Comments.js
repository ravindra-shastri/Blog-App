import React from 'react';
import Comment from './Comment';
export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      comments: '',
    }
  }

  componentDidMount() {
    this.getComments();
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let slug = this.props.slug;
    let { inputText } = this.state;
    if (inputText) {
      fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment: { body: inputText } }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (!res.ok) {
            return res.json()
              .then((errors) => {
                return (errors);
              });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          this.setState({ inputText: '', comments: '' }, this.getComments);
        })
        .catch((err) => console.log(err));
    }
  }

  handleDelete = ({ target }) => {
    let { id } = target.dataset;
    console.log(typeof id);
    let slug = this.props.slug;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/comments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then(({ errors }) => {
              return (errors);
            });
        }
        this.setState({ comments: '' }, this.getComments);
      })
      .catch((err) => console.log(err));
  };

  getComments = () => {
    let slug = this.props.slug;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/comments`)
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then(({ errors }) => {
              return (errors);
            })
        }
        return res.json();
      })
      .then(({ comments }) => {
        console.log(comments);
        this.setState({ comments });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { inputText, comments } = this.state;
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit} className="comment-box">
            <textarea
              placeholder="Enter comment"
              onChange={this.handleChange}
              rows="1"
              value={inputText}
              name="inputText"
            >
            </textarea>
            <input type="submit" value="Add Comment" className="submit-comment" />
            <div>
              <Comment comments={comments} handleDelete={this.handleDelete} />
            </div>
          </form>

        </div>
      </>
    )
  }

}


