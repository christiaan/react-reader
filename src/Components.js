import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

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
  transition: all 0.6s ease;
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
