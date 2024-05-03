import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import documentList from './documentList';

const store = configureStore({
    reducer: {
        auth : authSlice,
        //fetch posts
        document:documentList,
    }
});


export default store;