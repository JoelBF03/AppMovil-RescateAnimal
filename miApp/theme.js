import { DefaultTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    background: '#ffffff',
    text: '#000000',
    surface: '#ffffff',
    onSurface: '#000000',
    placeholder: '#888888',
  },
};
