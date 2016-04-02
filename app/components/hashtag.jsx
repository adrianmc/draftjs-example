import React from 'react';

export function hashtagStrategy(contentBlock, callback) {
  const text = contentBlock.getText();
  const regex = /\#[\w\u0590-\u05ff]+/g;
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export const HashtagSpan = (props) => {
  return <span {...props} style={{color: 'red'}}>{props.children}</span>;
}