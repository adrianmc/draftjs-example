import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    const {editorState} = this.state;
    return (
      <div id="content">
        <h1>Draft Editor</h1>
        <div style={{width: '100%', border: '1px solid grey', padding: '6px'}}>
          <Editor editorState={editorState} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
