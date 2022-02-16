import React, { Fragment, useEffect, useState,  } from 'react';
import { makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Grid, TextField, FormControl, MenuItem, Button } from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios'

const MySwal = withReactContent(Swal);
const useStyles = makeStyles({
  container: {
    marginLeft: '100px',
    width: '100%',
    height: '100%',
  },
  formControlRoot: {
    '& .MuiOutlinedInput-input': {
      paddingTop: 12,
      paddingBottom: 12,
      backgroundColor: 'transparent',
      borderRadius: 4,
      fontSize: '14px',
      fontFamily: 'Arial,san-serif',
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
    },
  },
});

const DynamicForm = () => {
  const classes = useStyles();
  const routerHistory = useHistory();
  const [data, setData] = useState([]);
  const randomString = Math.random().toString(36).substring(2,7);
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    randomString: randomString,
  });
  const [resp, setResp] = useState({});

  const uri = 'https://vb-react-exam.netlify.app/api/form'
  
  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        try {
          const res = await axios.get(uri)
          setData(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, 300);
  }, []);

  const send = () => {
    axios.post(uri, info)
    .then((response) => {
      try {
        routerHistory.push({ pathname: '/response', data: response});
      } catch (error) {
        console.log(error);
      }
    });
  };
  const handleChange = e => {
    e.persist();
    let newData = JSON.parse(JSON.stringify(data));
    newData.find(item => item.fieldName === e.target.name && (item.value = e.target.value, true));
    setData(newData);
    if (e.target.name === 'firstName') {
      setInfo({...info, firstName: e.target.value})
    } else if (e.target.name === 'lastName') {
      setInfo({...info, lastName: e.target.value})
    } else if (e.target.name === 'emailAddress') {
      setInfo({...info, emailAddress: e.target.value})
    }
  };
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
        <div className={classes.container}>
          <h3>Dynamic Form</h3>
        {data.map((item, idx) => {
          return (
            <Grid key={idx} container spacing={2} className="mt-2">
              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    label={item.fieldName.replace('/([A-Z])/g', ' $1').trim()[0].toUpperCase() + item.fieldName.slice(1)}
                    type={item.type}
                    name={item.fieldName}
                    multiline={item.type === 'multiline'}
                    select={item.type === 'select'}
                    variant="outlined"
                    onChange={handleChange}
                    value={item.value}
                    className={clsx(classes.formControlRoot, 'form-control')}>
                    {item.type === 'select' && 
                      item.options.map((v, idx) => (
                        <MenuItem key={idx} value={v}>
                          {v}
                        </MenuItem>
                      ))  
                    }
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          );
        })}
        <Grid container spacing={2}>
          <Grid xs={4} sm={1}/>
          <Grid xs={4} sm={2}>
            <Button variant="contained"  color="primary" style={{ marginTop: '20px' }}
            onClick={send}>Submit</Button>
          </Grid>
          </Grid>
        </div>
    </Fragment>
  );
};

export default DynamicForm;