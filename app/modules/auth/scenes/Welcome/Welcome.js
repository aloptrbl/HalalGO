import React from 'react';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
} = FBSDK;
import {Button, SocialIcon, Divider} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import {actions as auth, constants as c} from "../../index"
const { signInWithFacebook } = auth;

import styles from "./styles"

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
    }

      //get users permission authorization (ret: facebook token)
      async onSignInWithFacebook() {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
              if (result.isCancelled) {
                alert('Login cancelled');
              } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      this.props.signInWithFacebook(data.accessToken.toString(), this.onSuccess, this.onError)
                    }
                  )
                 
              }
            },
            function(error) {
              alert('Login fail with error: ' + error);
            }
          );

       
    }

    onSuccess({ exists, user}) {
        if (exists) Actions.Main()
        else Actions.CompleteProfile({ user })
    }

    onError(error) {
        alert(error.message);
    }

    render() {
        return (
            <View style={styles.container}>
              <StatusBar
     backgroundColor="#FF553F"
     barStyle="light-content"
   />
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={{uri: ""}}/>
                    <Text style={styles.title}>HALALGO</Text>
                    <Text style={{color:'white'}}>Your New Halal Experience </Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <SocialIcon
                            raised
                            button
                            type='facebook'
                            title='SIGN UP WITH FACEBOOK'
                            iconSize={19}
                            style={[styles.containerView, styles.socialButton]}
                            fontStyle={styles.buttonText}
                            onPress={this.onSignInWithFacebook}/>

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>
                                Or
                            </Text>
                        </View>

                        <Button
                            raised
                            borderRadius={4}
                            title={'SIGN UP WITH E-MAIL'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={Actions.Register}/>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={Actions.Login}>
                            <Text style={styles.signInText}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}


export default connect(null, {signInWithFacebook})(Welcome);