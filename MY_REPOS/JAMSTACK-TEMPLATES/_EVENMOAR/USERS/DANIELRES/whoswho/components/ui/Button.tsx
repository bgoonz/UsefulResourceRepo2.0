type TButtonProps = {
  type: 'button' | 'submit' | 'reset',
  onClick?: () => void
}

export const Button: React.FC<TButtonProps> = ({ children, type, ...props }) => {
  return (
    <button
      {...props}
      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded focus:outline-none focus:shadow-outline"
      type={type}
    >
      <span className="opacity-50">{children}</span>
    </button>
  );
};
