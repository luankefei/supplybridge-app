import styled from "styled-components";
const Wrapper = styled.main`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    color: #9ca3af;
  }
  ul li {
    margin: 0 5px;
    text-transform: capitalize;
  }
  ul li a {
    text-decoration: none;
    color: #9ca3af;
  }
  footer {
    display: flex;
    justify-content: center;
  }
  span {
    color: #d1d5db;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    font-size: 14px;
    text-align: center;
  }
`;
export default function Footer() {
  return (
    <Wrapper>
      <footer>
        <ul>
          <li>
            <a href="#">terms</a>
          </li>
          <li>
            <span>•</span>
          </li>
          <li>
            <a href="#">privacy</a>
          </li>
          <li>
            <span>•</span>
          </li>
          <li>&copy; 2023 supply bridge</li>
        </ul>
      </footer>
    </Wrapper>
  );
}
