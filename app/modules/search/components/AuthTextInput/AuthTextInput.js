import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { View } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../utils/validate'
import styles from "./styles"

class AuthTextInput extends Component {
    constructor(props) {
        super(props);
        this.state ={
        backgroundColor: null,
        }
    }
    onFocus() {
    this.setState({
        backgroundColor: 'green'
    })
  }

  onBlur() {
    this.setState({
      backgroundColor: '#ededed'
    })
  }
    render() {
        const { showLabel, multiline, numberofline, placeholder, autoFocus, onChangeText, secureTextEntry,shake } = this.props;

        return (
            <View style={styles.container}>
                <FormInput
                    autoCapitalize='none'
                    shake={shake}
                    multiline = {multiline}
                    numberOfLines = {numberofline}
                    clearButtonMode='while-editing'
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    inputStyle={styles.inputContainer}

                    value={this.props.value}/>
                {
                    (!isEmpty(this.props.error)) &&
                    <FormValidationMessage>
                        {this.props.error}
                    </FormValidationMessage>
                }
            </View>
        );
    }
}

AuthTextInput.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    multiline: PropTypes.bool,
    shake: PropTypes.bool,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    number: PropTypes.number
}

AuthTextInput.defaultProps = {
    autoFocus: false,
    secureTextEntry: false,
    shake: false,
}

export default AuthTextInput;