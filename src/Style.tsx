import styled from 'styled-components';

const Style = styled.div`
  display: inline-block;
  position: absolute;
  width: 210px;
  height: 210px;
  @media screen and (min-width: 768px) {
    height: 310px;
    width: 310px;
  }
  top: -10px;
  svg path {
    opacity: 0.7;
  }
  .sliderHandle {
    width: 50%;
    pointer-events: all;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 0 50%;
    &:after {
      content: '';
      display: block;
      width: 15px;
      height: 15px;
      border-radius: 30px;
      position: absolute;
      right: -5px;
      background: linear-gradient(to top, #fff, #f2f2f2);
      border: 1px solid #ccc;
      top: -10px;
      transform: all ease 0.4s;
    }
    &:hover:after {
      box-shadow: 0 0 10px rgb(37, 205, 247);
    }
  }
  ${({ overrideStyle }) => overrideStyle}
`;
export default Style;
