const ControllMenu = (props) => {
  const { save, update, value, isSaving } = props;
  // const firstBlock = value.blocks.get(0);

  // const getTitle = () => firstBlock ? firstBlock.text : 'No Title';

  // const title = getTitle();

  // const saveCtrl = () => {
  //   save(JSON.stringify(value.toJSON()), getTitle());
  // }

  // const updateCtrl = () => {
  //   update(JSON.stringify(value.toJSON()), getTitle(), true);
  // }

  return (
    <div style={{ marginBottom: "40px", textAlign: "right" }}>
      <div
        className="status-box"
        style={{ marginRight: "10px", display: "inline-block" }}
      >
        {isSaving ? "Saving..." : "Saved"}
      </div>
      <button
        disabled={isSaving}
        onClick={() => save()}
        style={{ marginRight: "10px" }}
        className="btn btn-success"
      >
        {" "}
        Save Blog{" "}
      </button>
      <button onClick={() => update()} className="btn btn-primary">
        {" "}
        Publish Blog{" "}
      </button>
    </div>
  );
};

export default ControllMenu;
