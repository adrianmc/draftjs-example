import React from 'react';
import {Entity, Modifier, EditorState} from 'draft-js';

export function highlightStrategy(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      if (entityKey === null) {
        return false;
      }
      return Entity.get(entityKey).getType() === 'HIGHLIGHT';
    },
    callback
  );
}

export const HighlightSpan = (props) => {
  return <span {...props} style={{backgroundColor: 'yellow'}}>{props.children}</span>;
}

export function setHighlight(editorState) {
  const contentState = editorState.getCurrentContent();
  const targetRange = editorState.getSelection();
  const key = Entity.create('HIGHLIGHT', 'MUTABLE');
  
  const contentStateWithHighlight = Modifier.applyEntity(
    contentState,
    targetRange,
    key
  );
  return EditorState.push(editorState, contentStateWithHighlight);
}