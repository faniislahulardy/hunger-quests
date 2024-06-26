import styled from 'styled-components';

export default function Loader() {
  return (
    <LoaderContainer>
      {/* <CircleContainer /> */}
      <CircleContainer></CircleContainer>
      <SVGContainer>
        <DiamondContainer xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 98'>
          <DiamondLarge points='44 49 22 98 0 49 22 0' />
          <Diamond points='40 49 22 89 4 49 22 9' />
        </DiamondContainer>
      </SVGContainer>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  --circle-color: rgba(0, 0, 0, 0.7);
  --circle-diameter: 50px;
  --circle-radius: (var(--circle-diameter) / 2);
  --svg-dimension: 80px;
  --svg-half-dimension: (var(--svg-dimension) / 2);
  --svg-location: 50%;
  --primary-color: #fff;
  --drop-shadow: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
  --fadein-animation-duration: 400ms;
  --fadein-animation: var(--fadein-animation-duration) ease-in-out forwards;
  --spinner-animation: 6s ease-in-out alternate infinite;

  position: absolute;
  bottom: calc(var(--svg-dimension) + 20px);
  left: calc(var(--svg-location) - var(--circle-diameter) + 10px);

  @keyframes spinner {
    20% {
      transform: rotate(0);
    }
    80%,
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes logo-enter {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
  }
  @keyframes diamonds-enter {
    to {
      opacity: 1;
    }
  }
`;

const CircleContainer = styled.div`
  animation: diamonds-enter var(--fadein-animation);
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  background-color: var(--circle-color);
  border: solid 1px #fff;
  border-radius: 50%;
  position: absolute;
  top: calc(var(--svg-location) - var(--circle-radius));
  left: calc(var(--svg-location) + 15px);
`;

const SVGContainer = styled.div`
  width: var(--svg-dimension);
  height: var(--svg-dimension);
  position: absolute;
  top: calc(var(--svg-location) - var(--svg-half-dimension));
  left: calc(var(--svg-location) - var(--svg-half-dimension));
`;
const DiamondContainer = styled.svg`
  filter: var(--drop-shadow);
  position: absolute;
  width: var(--svg-dimension);
  height: var(--svg-dimension);
`;

const Diamond = styled.polygon`
  animation:
    diamonds-enter var(--fadein-animation),
    spinner var(--spinner-animation);
  animation-delay: calc(var(--fadein-animation-duration) / 5), var(--fadein-animation-duration);
  transform-origin: 50%;
  fill: transparent;
  stroke: var(--primary-color);
  opacity: 0;
`;

const DiamondLarge = styled.polygon`
  animation:
    diamonds-enter var(--fadein-animation),
    spinner var(--spinner-animation);
  animation-delay: calc(var(--fadein-animation-duration) / 2.5), var(--fadein-animation-duration);
  animation-direction: normal, alternate-reverse;
  transform-origin: 50%;
  fill: transparent;
  stroke: var(--primary-color);
  opacity: 0;
`;
