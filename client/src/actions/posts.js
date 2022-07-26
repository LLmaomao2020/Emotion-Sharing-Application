import * as api from "../api/index.js";
import {FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH,UPDATE,DELETE,LIKE, CREATE,START_LOADING,END_LOADING} from '../constants/actionTypes';
//Action Creators
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data:{data,currentPage, numberOfPages} } = await api.fetchPosts(page);
    console.log(numberOfPages);
    dispatch({ type: FETCH_ALL, payload: {data,currentPage,numberOfPages} });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch=(searchQuery)=> async(dispatch)=>{
  try {
    dispatch({type:START_LOADING});
    const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type:END_LOADING});
    
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post,navigate) => async (dispatch) => {
    try {
      dispatch({type:START_LOADING});
      const { data } = await api.createPost(post);
      
      dispatch({ type: CREATE, payload: data });
      navigate(`/posts/${data._id}`);
     
    } catch (error) {
      console.log(error.message);
    }
  };

export const updatePost=(id,post)=>async (dispatch)=>{

    try{
        const {data}=await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data})
    }
    catch(error){
        console.log(error);

    }

}

export const deletePost=(id)=>async(dispatch)=>{
   try{
     await api.deletePost(id);
     console.log('Delete!');
     dispatch({type:DELETE,payload:id})
   }
   catch(error){
     console.log(error);
   }
}

export const likePost=(id)=>async(dispatch)=>{
  try{
    const {data} = await api.likePost(id);
    dispatch({type:LIKE,payload:data})
  }
  catch(error){
    console.log(error);
  }
}