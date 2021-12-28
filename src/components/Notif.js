import React from 'react';
import { Message } from 'semantic-ui-react';

const Notif = (props) => (
  <div style={{backgroundColor: 'red'}}>
    <Message negative={true} success={true}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Message.Header>{props.header}</Message.Header>
        <button onClick={props.reset}>x</button>
      </div>
      <p>{props.content}</p>
    </Message>
  </div>
);

export default Notif;
