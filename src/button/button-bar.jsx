import React from 'react';
import Button from './button';

import { Main, FirstRow, SecondRow } from './button-bar.styled';

const firstButtons = [1, 2, 3, 4, 5];
const secondButtons = [6, 7, 8, 9, null];

class ButtonBar extends React.Component {
  buildButton = value => {
    const { onClick, theme } = this.props;
    return <Button key={value} onClick={onClick} value={value} theme={theme} />;
  };

  render() {
    return (
      <Main>
        <FirstRow>{firstButtons.map(this.buildButton)}</FirstRow>
        <SecondRow>{secondButtons.map(this.buildButton)}</SecondRow>
      </Main>
    );
  }
}
export default ButtonBar;
