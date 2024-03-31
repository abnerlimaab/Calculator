import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, useColorScheme } from 'react-native';
import { createStyles } from './styles';
import { themes } from '../../styles/themes';

export enum Enphasis {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

interface CalculatorButomProps extends TouchableOpacityProps {
  children: string;
  enphasis: Enphasis;
}

function CalculatorButom({ children, enphasis, ...rest }: CalculatorButomProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(themes[colorScheme ?? 'light'], enphasis);

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

export default CalculatorButom;
