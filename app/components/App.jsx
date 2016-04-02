import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  convertToRaw,
} from 'draft-js';

import {hashtagStrategy, HashtagSpan} from './hashtag';
import {highlightStrategy, HighlightSpan, setHighlight} from './highlight';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: hashtagStrategy,
        component: HashtagSpan,
      },
      {
        strategy: highlightStrategy,
        component: HighlightSpan,
      },
    ]);

    this.state = {editorState: EditorState.createEmpty(decorator)};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onHighlightClick() {
    const newEditorState = setHighlight(this.state.editorState);
    this.setState({editorState: newEditorState});
  }

  _logState() {
    const content = this.state.editorState.getCurrentContent();
    console.log(convertToRaw(content));
  }

  render() {
    const {editorState} = this.state;
    return (
      <div id="content">
        <h1>Draft Editor</h1>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onHighlightClick.bind(this)}>Highlight</button>
        <div className="editor">
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
        <button onClick={this._logState.bind(this)}>Log State</button>
      </div>
    );
  }
}