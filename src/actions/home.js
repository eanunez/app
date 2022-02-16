import axios from 'axios';

import { GET_DATA } from './types';


export const getData = () => dispatch => {
    axios.get('https://vb-react-exam.netlify.app/api/form')
        .then(res => {
            dispatch( {
                type: GET_DATA,
                payload: res.data
            });
        }).catch(err => console.log(err));
};