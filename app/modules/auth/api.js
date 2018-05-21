import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  CameraRoll,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
console.disableYellowBox = true
import { auth, database, provider, storage } from "../../config/firebase";
import RNFetchBlob from 'react-native-fetch-blob';

//Register the user using email and password
export function register(data, callback) {
    const { email, password } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, error));
}

export function signInWithFacebook (fbToken, callback) {
   const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
    auth.signInWithCredential(credential)
        .then((user) => getUser(user, callback))
        .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser (user, callback) {
    return new Promise((resolve, reject) => { 
    const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = RNFetchBlob.polyfill.Blob
const mime = 'application/octet-stream';
let uploadBlob = null  
    const sessionId = new Date().getTime();
    const { image } = user;
    let rnfbURI =  RNFetchBlob.wrap(image);
    const imageRef =  storage
    .ref('images')
    .child(user.uid);
       // create Blob from file path
       fs.readFile(image, 'base64')
       .then((data) => {
         return Blob.build(data, { type: `${mime};BASE64` })
       })
 .then((blob) => {
    uploadBlob = blob
           // upload image using Firebase SDK
     return imageRef
     .put(blob, { contentType : mime })
  }) 
  .then((blob) => {
    uploadBlob.close()
    return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url);
        user.image = url;
        database.ref('users').child(user.uid).update({ ...user })
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, {message: error}));
      })
      .catch(error => {
        reject(error);
    })
    });  
   
}
//Create the user object in realtime database
export function createpost(user, callback) {
   
    const sessionId = new Date().getTime();
    JSON.stringify(user);
    let image = user.image;
    let rnfbURI = RNFetchBlob.wrap(image);
    const imageRef =  storage
    .ref('posts')
    .child(`${sessionId}`);
       // create Blob from file path
  Blob.build(rnfbURI, { type : 'image/jpeg;'})
 .then((blob) => {
           // upload image using Firebase SDK
     return imageRef
     .put(blob, { contentType : 'image/jpeg' })
  }) 
  .then((blob) => {
     imageRef.getDownloadURL().then(function(url) {
        user.image = url
        database.ref('posts').push({ ...user })
        .then(() => callback(true, {}, {}))
        .catch((error) => callback(false, {}, {}));
      })
    
    
  }) 
 
}

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => getUser(user, callback))
        .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function getUser(user, callback) {
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}