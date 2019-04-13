import {
  GET_ROOMS,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_ERRORS,
  GET_EMAIL_TOKEN,
  AUTH_ERROR,
  DELETE_ROOM,
  CLEAR_DATA,
  GET_VIDEOS,
  DELETE_VIDEO,
  ADD_VIDEOS
} from "./types";
import axios from "axios";

export const addVideos = (videos, room) => dispatch => {
  console.log(room);
  videos.map((video, idx) => {
    const info = {
      url: video.url,
      room: room,
      videoID: video.ID || null,
      position: idx
    };
    axios("/videoQueue/add", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify(info)
    }).catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
      dispatch({
        type: ADD_VIDEOS,
        payload: "errors"
      });
    });
    return dispatch({
      type: ADD_VIDEOS,
      payload: "Success"
    });
  });
};

export const getVideos = roomID => dispatch => {
  axios("/videoQueue/getData", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify({ room: roomID })
  }).then(data => {
    console.log(data);
    dispatch({
      type: GET_VIDEOS,
      payload: data.data
    });
  });
};

export const deleteVideos = () => dispatch => {
  //TODO: get videos
};

export const registerUser = newUserData => dispatch => {
  axios("/registerUser", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify(newUserData)
  })
    .then(payload => {
      if (payload.data.token) {
        localStorage.setItem("token", payload.data.token);
      }
      dispatch({
        type: REGISTER_USER,
        payload: newUserData
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

export const loginUser = loginData => dispatch => {
  axios("/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify(loginData)
  })
    .then(data => {
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
      }
      dispatch({
        type: LOGIN_USER,
        payload: data.message
      });
      dispatch({
        type: GET_ROOMS,
        payload: data.data.data
      });
    })
    .catch(err => console.log(err));
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
  dispatch({
    type: CLEAR_DATA
  });
};

export const getRooms = roomData => (dispatch, getState) => {
  const token = getState().Auth.token;
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `bearer ${token}`;
  }

  axios("/auth/createRoom", {
    method: "POST",
    headers,
    data: JSON.stringify({ name: roomData })
  })
    .then(res => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

export const getEmailToken = token => dispatch => {
  axios.get(`/auth/confirmation/${token}`).then((err, data) => {
    if (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      });
    } else {
      dispatch({
        type: GET_EMAIL_TOKEN,
        payload: true
      });
    }
  });
};

export const roomDelete = id => (dispatch, getState) => {
  const token = getState().Auth.token;
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `bearer ${token}`;
  }
  axios("/auth/DeleteRoom", {
    method: "POST",
    headers,
    data: JSON.stringify({ roomID: id })
  })
    .then(res => {
      dispatch({
        type: DELETE_ROOM,
        payload: res.data.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
