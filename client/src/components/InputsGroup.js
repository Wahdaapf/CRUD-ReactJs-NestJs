import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const InputsGroup = ({ name, onChangeHandler, errors, value, type }) => {
  return (
    <FormControl isInvalid={errors}>
      <FormLabel>{name}</FormLabel>
      <Input type={type} name={name} onChange={onChangeHandler} value={value} />
      {
        errors && errors?.map((err) => {
            return <FormErrorMessage>{err}</FormErrorMessage>
        })
      }
    </FormControl>
  );
};

export default InputsGroup;
