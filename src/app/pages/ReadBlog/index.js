import "./index.css";

import { Component } from "react";
import { Popover } from "antd";
import { AccountCard, Navbar, Stud } from "../../components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { writerPlaceholder } from "../../../static";
import { routes } from "../../router/routes";
import { getBlog, handleLike, handleSave } from "../../../store/blog/actions";
import { userStorage } from "../../../utils";
import { ReadBlogSkeleton } from "../../skeletons";
import DeleteBlog from "../DeleteBlog";
import AlterBlog from "../AlterBlog";

class ReadBlog extends Component {
  state = {
    user: userStorage.getUser(),
  };

  componentDidMount() {
    this.props.getBlog(this.props.match.params.blogId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.blogId !== this.props.match.params.blogId)
      this.props.getBlog(this.props.match.params.blogId);
  }

  render() {
    const blog = this.props.blog.blog;
    return (
      <div className="Feed ReadBlog">
        <Navbar backBtn feed profile logout />
        <div className="Blogs">
          {this.props.blog.loading ? (
            <ReadBlogSkeleton />
          ) : (
            <article className="Blog">
              <header className="Blog-Head">
                <div className="Blog-Head-left">
                  <img
                    src={blog?.author?.dp}
                    onError={(e) => (e.target.src = writerPlaceholder)}
                    alt="dp"
                  />
                  <span>
                    <h3>{blog?.title}</h3>
                    <Popover
                      content={
                        <AccountCard
                          img={blog?.author?.dp}
                          username={blog?.author?.username}
                          name={blog?.author?.name}
                        />
                      }
                      style={{ padding: 0 }}
                    >
                      <Link to={routes.PROFILE(blog?.author?.username)}>
                        {blog?.author?.username}
                      </Link>
                    </Popover>
                  </span>
                </div>
              </header>
              <div
                className="Blog-Body"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
              {blog?.author?.username !== this.state.user.username ? (
                <div className="Blog-Nav">
                  <div onClick={() => this.props.handleLike(blog?.pk)}>
                    <Stud
                      type={blog.likesList}
                      icon="favorite"
                      theme="#ff6347"
                      count={blog.noOfLikes}
                      active={blog.isLiked}
                    />
                  </div>
                  <div onClick={() => this.props.handleSave(blog?.pk)}>
                    <Stud
                      type="Save"
                      icon="bookmark"
                      theme="#1e90ff"
                      active={blog.isSaved}
                    />
                  </div>
                </div>
              ) : (
                <footer className="Blog-Nav">
                  <div onClick={() => this.props.handleLike(blog?.pk)}>
                    <Stud
                      type={blog.likesList}
                      icon="favorite"
                      theme="#ff6347"
                      count={blog.noOfLikes}
                      active={blog.isLiked}
                    />
                  </div>
                  <Link to={routes.EDIT_BLOG(blog.pk)}>
                    <Stud type="Edit" icon="edit" theme="#1e90ff" active />
                  </Link>
                  <div
                    onClick={() =>
                      AlterBlog(blog?.pk, blog?.title, blog?.isPublished, () =>
                        this.props.getBlog(this.props.match.params.blogId)
                      )
                    }
                  >
                    <Stud
                      type={blog?.isPublished ? "Archive" : "Publish"}
                      icon={blog?.isPublished ? "archive" : "library_books"}
                      theme="#008000"
                      active
                    />
                  </div>
                  <div
                    onClick={() =>
                      DeleteBlog(blog?.pk, blog?.title, () =>
                        this.props.history.push(routes.FEED)
                      )
                    }
                  >
                    <Stud type="Delete" icon="delete" theme="#ff6347" active />
                  </div>
                </footer>
              )}
            </article>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { blog: state.blog };
};

export default connect(mapStateToProps, {
  getBlog,
  handleLike,
  handleSave,
})(ReadBlog);
