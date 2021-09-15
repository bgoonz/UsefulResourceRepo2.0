import React from 'react';
import { connect } from 'react-redux';
import { initFilesystem, appendCmd, setCmd } from '../actions/base';
import { root } from '../lib/folders';
import { run, autocomplete, popHistory } from '../actions/run';
import { setConfig } from '../actions/config';

class Term extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: 0};
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.bindTermRef = this.bindTermRef.bind(this);
    this.bindPromptRef = this.bindPromptRef.bind(this);
  }

  componentDidMount() {
    const { autoFocus } = this.props;
    this.props.initFilesystem(root);
    autoFocus && this.prompt && this.prompt.focus();
  }

  componentDidUpdate() {
    const { maxHeight, autoFocus } = this.props;
    const height = this.term.scrollHeight > maxHeight ? maxHeight : this.term.scrollHeight;
    this.term.style.height = `${height}px`;
    this.term.scrollTop = this.term.scrollHeight;
    autoFocus && this.prompt && this.prompt.focus();
  }

  startRecording() {
    if (!this.props.recording) {
      this.props.setConfig({recording: true});
    }
  }

  handleInput(e) {
    this.startRecording();
    if (e.key === 'Enter') {
      if (this.props.options) {
        this.props.setCmd(this.props.options[this.state.selected]);
        this.setState({selected: 0});
      }
      return this.props.run();
    }
  }

  handleChange(e) {
    this.props.setCmd(e.target.value);
  }

  handleKeyDown(e) {
    this.startRecording();
    switch (e.keyCode) {
      case 8:
        e.preventDefault();
        const cmd = this.props.cmd.slice(0, -1);
        this.props.setCmd(cmd);
        break;
      case 9:
        e.preventDefault();
        this.props.autocomplete();
        break;
      case 38:
        e.preventDefault();
        if (this.props.options) {
          this.setState({
            selected: this.state.selected > 0 ? this.state.selected - 1 : this.props.options.length - 1
          });
        } else {
          this.props.popHistory();
        }
        break;
      case 40:
        e.preventDefault();
        if (this.props.options) {
          this.setState({
            selected: (this.state.selected + 1) % this.props.options.length
          });
        } else {
          this.props.popHistory();
        }
        break;
    }
  }

  handleClick(e) {
    this.prompt && this.prompt.focus();
    if (e.target.tagName === 'STRONG') {
      this.props.setCmd(e.target.textContent);
    }
  }

  handleSelectOption(i) {
    this.props.setCmd(this.props.options[i]);
    this.props.run();
    this.setState({selected: 0});
  }

  format(line) {
    if (!line) { return {__html: '<br/>'}; }
    return {
      __html: line
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, (m, bold) => (
          `<strong>${bold}</strong>`
        ))
        .replace(/__(.+?)__/g, (m, em) => (
          `<em>${em}</em>`
        ))
        .replace(/\[\[(.+?)\]\]/g, (m, link) => (
          `<a href="${link}" target="_blank">${link}</a>`
        ))
    };
  }

  bindTermRef(ref) {
    this.term = ref;
  }

  bindPromptRef(ref) {
    this.prompt = ref;
  }

  render() {
    const { prompt, options } = this.props;
    const { selected } = this.state;

    return <div>
      <div className="term" onClick={this.handleClick} ref={this.bindTermRef}>
        <pre className="term--body">
          {this.props.history.map((line, i) => (
            <div
                key={i}
                className="term--history"
                dangerouslySetInnerHTML={this.format(line)}
            />
          ))}
          {prompt && <div className="term--current">
            <span
                className="term--prompt"
                dangerouslySetInnerHTML={this.format(prompt)}
            />
            <span className="term--input">{this.props.cmd}</span>
            <span className="term--caret"></span>
          </div>}
          {options && <div className="term--current">
            {options.map((option, i) => (
              <div key={i} onClick={() => this.handleSelectOption(i, option)}>
                {i === selected ? <strong>{option}</strong> : option}
              </div>
            ))}
          </div>}
        </pre>
      </div>
      <input
          className="term--textfield"
          ref={this.bindPromptRef}
          type="text"
          value={this.props.cmd}
          onKeyDown={this.handleKeyDown}
          onKeyPress={this.handleInput}
          onChange={this.handleChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
      />
    </div>;
  }
}

function mapStateToProps(state) {
  const { cmd, files, history, prompt, config } = state;
  return {
    cmd,
    files,
    history,
    prompt: prompt.text,
    options: prompt.options,
    recording: config.recording
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setCmd: (cmd) => dispatch(setCmd(cmd)),
    appendCmd: (char) => dispatch(appendCmd(char)),
    run: (cmd) => dispatch(run(cmd)),
    autocomplete: () => dispatch(autocomplete()),
    popHistory: () => dispatch(popHistory()),
    setConfig: (settings) => dispatch(setConfig(settings)),
    initFilesystem: (files) => dispatch(initFilesystem(files))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Term);
