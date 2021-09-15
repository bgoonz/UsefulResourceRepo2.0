import { keyframes, style } from 'typestyle';

const $mainColor = '#abbcd980';
const $numberColor = '#6483b9';

const circleRotation = (pos: number) => {
  if (pos * 6 - 90 < 0) {
    return `${pos * 6 - 90 + 360}deg`;
  } else {
    return `${pos * 6 - 90}deg`;
  }
};

export const circlePosition = (pos: number, trans: number) => {
  return style({
    transform: `rotate(${circleRotation(pos)}) translate(${trans}vmin) rotate(-${circleRotation(pos)})`,
  });
};

const fade = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const colonStyle = style({
  animationName: fade,
  animationDuration: '0.5s',
  animationIterationCount: 'infinite',
  animationDirection: 'alternate',
  animationTimingFunction: 'ease-in-out',
});

export const numberStyle = style({
  color: $numberColor,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '6vmin',
  height: '6vmin',
  margin: '-3vmin',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.5vmin',
  userSelect: 'none',
});

export const bulletStyle = style({
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: $mainColor,
  position: 'absolute',
  top: '50%',
  left: '50%',
  $nest: {
    '&:hover': {
      backgroundColor: $numberColor,
    },
    '&.time': {
      backgroundColor: $numberColor,
    },
    '&.large': {
      width: '6vmin',
      height: '6vmin',
      margin: '-3vmin',
    },
    '&.medium': {
      width: '4vmin',
      height: '4vmin',
      margin: '-2vmin',
    },
    '&.small': {
      width: '2vmin',
      height: '2vmin',
      margin: '-1vmin',
    },
  },
});

export const pomodoroStyle = style({
  height: '100vh',
  width: '100vw',
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const squareStyle = style({
  textAlign: 'center',
  width: '80vmin',
  height: '80vmin',
  position: 'relative',
});

export const outerCircleStyle = style({
  position: 'absolute',
  height: '90vmin',
  width: '90vmin',
  left: '-5vmin',
  top: '-5vmin',
  borderRadius: '50%',
});

export const circleStyle = style({
  position: 'absolute',
  top: '5vmin',
  left: '5vmin',
  height: '70vmin',
  width: '70vmin',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const controlStyle = style({
  position: 'absolute',
  top: '65%',
  display: 'flex',
});

export const centerStyle = style({
  color: $numberColor,
  fontSize: '18vmin',
  fontFamily: 'Digital',
  userSelect: 'none',
});

export const controlIconStyle = style({
  margin: '0 1vmin',
  cursor: 'pointer',
  $nest: {
    '& svg': {
      fill: $mainColor,
      width: '7vmin',
      height: '7vmin',
      $nest: {
        '&:hover': {
          fill: $numberColor,
        },
      },
    },
  },
});

export const audioStyle = style({
  display: 'none',
});
