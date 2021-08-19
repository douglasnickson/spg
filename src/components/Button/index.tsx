import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Touchable, Text } from './styles';

interface IProps extends TouchableOpacityProps {
  children: string;
}

const Button: React.ElementType<IProps> = ({ children, ...props }) => {
  return (
    <Touchable {...props}>
      <Text>{children}</Text>
    </Touchable>
  );
};
export default Button;
