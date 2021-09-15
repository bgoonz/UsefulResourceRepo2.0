import { style } from 'typestyle';

type Position = 'right' | 'left';

const svgStyle = (position: Position, rotation: number) =>
  style({
    $nest: {
      '& svg': {
        $nest: {
          '&:hover': {
            fill: '#ff5537',
            cursor: 'pointer',
          },
        },
        fill: '#666',
        transform: `rotate(${rotation}deg)`,
      },
    },
    width: '35px',
    height: '35px',
    position: 'absolute',
    top: '0.5rem',
    right: position === 'right' ? '0.5rem' : 'unset',
    left: position === 'left' ? '0.5rem' : 'unset',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

export const bugStyle = svgStyle('right', 45);
export const githubStyle = svgStyle('left', 0);
