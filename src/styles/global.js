import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  // CSS Reset
  * {
    margin: 0; padding: 0; outline: none;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%; // makes the page occupeis 100% of the page
  }

  body {
    background: #7159c1;

    // applies antialiasing in the font
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222; font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
