const ResourceLabel = ({ status }) => {
  return (
    <span className={`tag is-large ml-4 resource-${status}`}>{status}</span>
  );
};

export default ResourceLabel;
