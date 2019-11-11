import React from 'react';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = (
  { children, ...props } //...props can be onClick, button styles...
) => <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;

export default CustomButton;
