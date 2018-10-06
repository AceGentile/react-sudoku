import React, { Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getTheme, ThemeSelector } from './themes';
import Square from './sudoku-square';
import ButtonBar from './button-bar';
import Dialog from './dialog';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => `${theme.background}`};
  border-radius: 10px;
  width: 460px;
  overflow: hidden;
  box-shadow: ${({ theme }) => `0 0 10px 2px ${theme.primary}`};
  zoom: 1.25;
  z-index: 99;
`;

const Background = styled.div`
  background-color: ${({ theme }) => `${theme.background}`};
  width: 100vw;
  height: 100vh;
  position: absolute;
  margin: auto;
`;

const Board = styled.div`
  display: flex;
  width: 500px;
`;

class Sudoku extends React.Component {
  state = {
    startDate: new Date(),
    board: null,
    selectedBoardIndex: null,
    values: {},
    done: false,
    selectedRowIndex: null,
    selectedIndex: null,
    openDialog: false,
    theme: getTheme()
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeypress);
  }

  onKeypress = e => {
    const charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
    const value = charCode - 48;
    if (value >= 0 && value <= 9) {
      this.handleButtonPress(value || null);
    }
  }

  changeTheme = name => {
    this.setState({ theme: getTheme(name) })
  }

  setSelectedBoardIndexes = ({ ...indexes }) => this.setState({ ...indexes });

  setValue = (boardIndex, value) => {
    const { values } = this.state;
    this.setState({
      values: Object.assign(values, {
        [`${boardIndex}`]: value,
      }),
    });
    this.isDone();
  }

  setDialogState = () => {
<<<<<<< HEAD
    this.setState({ openDialog: !this.state.openDialog });
  }
=======
    const { openDialog } = this.state;
    this.setState({ openDialog: !openDialog });
  };
>>>>>>> 892c064b264cb7e6ef2789a8620bc89b305f7e9c

  isDone = () => {
    const { values } = this.state;
    let done = true;

    if (Object.keys(values).length === 0) return;
    Object.keys(values).forEach(v => {
      if (values[v].value === '' || values[v].value === null) done = false;
    });

    if (done) {
      this.setState({ done }, () => this.validate());
    }
<<<<<<< HEAD
  }

  getBoardIndex = (index, rowIndex) => rowIndex * 9 - (9 - index)
=======
  };

  getBoardIndex = (index, rowIndex) => rowIndex * 9 - (9 - index);
>>>>>>> 892c064b264cb7e6ef2789a8620bc89b305f7e9c

  handleButtonPress = value => {
    const { selectedBoardIndex, values } = this.state;
    const selectedBoardIndexValue = values[selectedBoardIndex];

    if (selectedBoardIndex === null) return;
    if (selectedBoardIndexValue.isOriginal) return;

    this.setValue(
      selectedBoardIndex,
      Object.assign(selectedBoardIndexValue, { value }),
    );
  }

  validate = () => {
    const { values } = this.state;
    const { done } = this.state;

    let errors = false;
    Object.values(values).forEach(({ value, answer }) => {
      if (value !== answer) errors = true;
    });

    if (done && !errors) this.setDialogState();
  }

  getValue = boardIndex => {
    const { values } = this.state;
    const valueForIndex = values[boardIndex];
<<<<<<< HEAD
    return valueForIndex && valueForIndex['value'];
  }
=======
    return valueForIndex && valueForIndex.value;
  };
>>>>>>> 892c064b264cb7e6ef2789a8620bc89b305f7e9c

  buildRow = rowIndex => ({ value: initialValue, answer }, index) => {
    const {
      selectedBoardIndex,
      selectedIndex,
      selectedRowIndex,
<<<<<<< HEAD
      board
=======
      theme,
      board,
>>>>>>> 892c064b264cb7e6ef2789a8620bc89b305f7e9c
    } = this.state;

    const boardIndex = this.getBoardIndex(index + 1, rowIndex + 1);
    const value = this.getValue(boardIndex);

    return (
      <Square
        key={(rowIndex + 1) * index + 10}
        value={value}
        initialValue={initialValue}
        answer={answer}
        rowIndex={rowIndex + 1}
        boardIndex={boardIndex}
        index={index + 1}
        board={board}
        selectedIndex={selectedIndex}
        selectedRowIndex={selectedRowIndex}
        selectedBoardIndex={selectedBoardIndex}
        setSelectedBoardIndexes={this.setSelectedBoardIndexes}
        setValue={this.setValue}
      />
    );
<<<<<<< HEAD
  }

  buildBoard = (x, i) => {
    return <Board key={i}>{x.map(this.buildRow(i))}</Board>;
  }

  render() {
    const { board } = this.props;
    const { openDialog } = this.state;

    return (
      <ThemeProvider theme={this.state.theme}>
        <Fragment>
          <Background />
          <Main>
            <ThemeSelector onChange={this.changeTheme}/>
            {board.map(this.buildBoard)}
            <Dialog
              isOpen={openDialog}
              stateManager={this.setDialogState}
              header="Congratz"
              message="You did it 👏"
            />
          </Main>
          <ButtonBar onClick={this.handleButtonPress} />
        </Fragment>
      </ThemeProvider>
=======
  };

  buildBoard = (x, i) => <Board key={i}>{x.map(this.buildRow(i))}</Board>;

  render() {
    const { board } = this.props;
    const { openDialog, theme, startDate } = this.state;
    const gameTimeInSeconds = Math.round(
      (Date.now() - startDate.getTime()) / 1000
    );

    return (
      <Fragment>
        <Main theme={theme}>
          {board.map(this.buildBoard)}
          <Dialog
            theme={theme}
            isOpen={openDialog}
            stateManager={this.setDialogState}
            header="Congratz"
            message="You did it 👏"
            completionTimeMessage={`It took you ${gameTimeInSeconds} seconds!`}
          />
        </Main>
        <ButtonBar theme={theme} onClick={this.handleButtonPress} />
      </Fragment>
>>>>>>> 892c064b264cb7e6ef2789a8620bc89b305f7e9c
    );
  }
}
export default Sudoku;
