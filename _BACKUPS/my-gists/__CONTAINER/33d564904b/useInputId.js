
let labelForId = 0;
export default const useInputId = () => {
  const labelId = React.useRef(() => labelForId++);
  return `my-input-${labelId.current}`;
};
