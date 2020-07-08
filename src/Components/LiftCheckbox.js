import * as React from 'react';
import { Checkbox } from 'react-native-paper';

export default class LiftCheckbox extends React.Component {
  state = {
    checked: false,
  };

  render() {
    const { checked } = this.state;
    return (
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        // uncheckedColor='red'
        onPress={() => { this.setState({ checked: !checked }); }}
      />
    );
  }
}