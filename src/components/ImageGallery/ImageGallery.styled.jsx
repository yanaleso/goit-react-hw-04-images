import styled from 'styled-components'

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: ${p => p.theme.space[0]};
  margin-bottom: ${p => p.theme.space[0]};
  padding: ${p => p.theme.space[0]};
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`