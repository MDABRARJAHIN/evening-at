import React from 'react';
const Validations = {
  isEmail: val => {
    let reg = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
    return reg.test(val);
  },
  isValidPassword: val => {
    let reg = /^[\w\-\s]{8,}$/;
    return reg.test(val);
  },
  isValidName: val => {
    let reg = /[a-zA-Z][a-zA-Z ]+$/;
    return reg.test(val);
  },
  comparePassword: (val1, val2) => {
    return val1 === val2;
  },
  isPhoneNo:(val)=>{
    let reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return reg.test(val);
  }
};
export default Validations;
