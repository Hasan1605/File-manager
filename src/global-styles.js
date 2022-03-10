import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #333333;
}`;
