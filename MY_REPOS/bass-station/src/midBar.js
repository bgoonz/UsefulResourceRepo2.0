const MidBar = () => {
  return (
    <div id="midBar">
      <p id="arpeggiatorL" className="boldLabel">
        ARPEGGIATOR
      </p>
      <div id="midLVBB1" className="VBarBreak" />
      <div id="midLBB1" className="barBreak" />
      <p id="portaL" className="boldLabel">
        PORTA
      </p>
      <div id="midLVBB2" className="VBarBreak" />
      <div id="midLBB2" className="barBreak" />
      <p id="lfosL" className="boldLabel">
        LFOS
      </p>
      <div id="midLVBB3" className="VBarBreak" />
      <div id="midLBB3" className="barBreak" />
      <p id="envelopesL" className="boldLabel">
        ENVELOPES
      </p>
      <div id="midLVBB4" className="VBarBreak" />
      <div id="midLBB4" className="barBreak" />
      <p id="effectsL" className="boldLabel">
        EFFECTS
      </p>
    </div>
  );
};

export default MidBar;
