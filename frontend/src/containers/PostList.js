import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';

function PostList({ posts, onDelete }) {
  if(!posts.length) {
    return (
      <div>
        No Posts
      </div>
    )
  }
  return (
    <div>
      {posts.map(post => {
        return (
          <Post user={ post.user } post={ post.post } key={ post.post._id } />
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
