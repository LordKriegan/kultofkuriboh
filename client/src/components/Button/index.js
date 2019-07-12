import styled, { css } from "styled-components"

export default styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid dodgerblue;
  color: dodgerblue;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary
      ? css`
          background: dodgerblue;
          color: white;
        `
      : props.secondary
      ? css`
          background: green;
          color: white;
        `
      : props.danger
      ? css`
          background: red;
          color: white;
        `
      : ""}
`
