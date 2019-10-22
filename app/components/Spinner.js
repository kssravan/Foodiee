import React from 'react';
import { View, StyleSheet } from 'react-native';
import InputSpinner from "react-native-input-spinner";

const Spinner = ({ onChange, value }) => {
  return (
    <InputSpinner
      max={10}
      min={0}
      step={1}
      colorLeft="green"
      colorRight="green"
      colorPress="green"
      value={value}
      onChange={onChange}
      height={40}
      width={100}
    />
  );
}

export default Spinner;