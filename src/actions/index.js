import jsonPlaceholder from '../apis/jsonPlaceholder';
import * as _ from 'lodash';

// normal action creator
export const clearPosts = () => ({
  type: 'CLEAR_POSTS'
});

// thunk action creators
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const fetchPostsAndUsers = id => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, 'userId'));

  userIds.forEach(id => dispatch(fetchUser(id)));
};
