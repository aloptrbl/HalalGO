import { auth, database, provider,storage } from "../../config/firebase";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
//Register the user using email and password
export function register(data, callback) {
    const { email, password } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser (user, callback) {
    database.ref('users').child(user.uid).update({ ...user })
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}

//Create the user object in realtime database
export function createrestaurant(user, callback) {
    const fs = RNFetchBlob.fs
    const Blobs = RNFetchBlob.polyfill.Blob
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blobs
    const mime = 'application/octet-stream';
let uploadBlob = null  
    const sessionId = new Date().getTime();
    const { image } = user;
    let rnfbURI = RNFetchBlob.wrap(image);
    const imageRef =  storage
    .ref('restaurants')
    .child(`${sessionId}`);
       // create Blob from file path
       fs.readFile(image, 'base64')
       .then((data) => {
         return Blobs.build(data, { type: `${mime};BASE64` })
       })
 .then((blob) => {
    uploadBlob = blob
           // upload image using Firebase SDK
     return imageRef
     .put(blob, { contentType : 'image/png' })
  }) 
  .then((blob) => {
    uploadBlob.close()
     imageRef.getDownloadURL().then(function(url) {
        user.image = url
        database.ref('restaurants').push({ ...user })
        .then(() => callback(true, {}, {}))
        .catch((error) => callback(false, {}, {}));
      })
    
    
  }) 
 
}

//Create the user object in realtime database
export function createhotel(user, callback) {
    const fs = RNFetchBlob.fs;
    const Blobs = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blobs = Blob;
    const sessionId = new Date().getTime();
    let image = user.image;
    let rnfbURI = RNFetchBlob.wrap(image);
    const imageRef =  storage
    .ref('hotels')
    .child(`${sessionId}`);
       // create Blob from file path
  Blobs.build(rnfbURI, { type : 'image/png;'})
 .then((blob) => {
           // upload image using Firebase SDK
     return imageRef
     .put(blob, { contentType : 'image/png' })
  }) 
  .then((blob) => {
     imageRef.getDownloadURL().then(function(url) {
        user.image = url
        database.ref('hotels').push({ ...user })
        .then(() => callback(true, {}, {}))
        .catch((error) => callback(false, {}, {}));
      })
    
    
  }) 
 
}

//Create the user object in realtime database
export function createproduct(user, callback) {
    const fs = RNFetchBlob.fs;
    const Blobs = RNFetchBlob.polyfill.Blob;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blobs;
    const sessionId = new Date().getTime();
    let image = user.image;
    let rnfbURI = RNFetchBlob.wrap(image);
    const imageRef =  storage
    .ref('products')
    .child(`${sessionId}`);
       // create Blob from file path
  Blobs.build(rnfbURI, { type : 'image/png;'})
 .then((blob) => {
           // upload image using Firebase SDK
     return imageRef
     .put(blob, { contentType : 'image/png' })
  }) 
  .then((blob) => {
     imageRef.getDownloadURL().then(function(url) {
        user.image = url
        database.ref('products').push({ ...user })
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