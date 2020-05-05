import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
    background: #333;
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f2f2f2 0%, #333 100%);
`;
export const ReaderContainer = styled.div`
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  appearance: none;
  background: none;
`;
export const FontSizeButton = styled(Button)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  background: #eee;
  border-radius: 2px;
  padding: 0.5rem;
`;
