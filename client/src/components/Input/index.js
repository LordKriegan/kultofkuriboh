import styled, { css } from "styled-components"

export default styled.input`
  border-radius: 3px;
  border: 2px solid dodgerblue;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary
      ? css`
          background: dodgerblue;
          color: white;
        `
      : props.error
      ? css`
          background: red;
          color: white;
        `
      : ""}
`
