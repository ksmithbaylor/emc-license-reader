import React from 'react';

import Summary from './Summary';
import Table from './Table';

import COLUMN_NAMES from 'json!./columnNames.json';

export class App extends React.Component {
  state = {
    license: null,
    summary: false
  }

  render() {
    const display = (this.state.summary) ? (
      <Summary license={this.state.license} />
    ) : (
      <Table license={this.state.license} />
    );

    return (
      <div>
        <input type="file" onChange={this.receiveFile}></input>
        <br />
        <button onClick={this.toggleSummary}>Toggle Summary</button>
        {display}
      </div>
    );
  }

  componentDidMount() {
    this.setState({ license: processText(require('raw!../license.lic')) });
  }

  toggleSummary = () => {
    this.setState({ summary: !this.state.summary });
  }

  receiveFile = (event) => {
    const reader = new FileReader();
    reader.onload = e => this.setState({license: processText(reader.result)});
    reader.readAsText(event.target.files[0]);
  }
}

function processText(text) {
  const lines = text.split('\n').filter(line => line.indexOf("'") !== 0);
  const grid = lines.map(line => line.split(';')).filter(line => line.length === 9);
  const rows = grid.map(row => zipObject(COLUMN_NAMES, row));
  rows.forEach(row => row.Issued = parseDate(row.Issued));
  rows.forEach(row => row.EnterBy = parseDate(row.EnterBy));
  return rows;
}

function zipObject(names, values) {
  const obj = {};
  names.forEach((name, i) => obj[name] = values[i]);
  return obj;
}

function parseDate(text) {
  if (!text) return '';
  const arr = text.match(/.{2}/g).map(n => parseInt(n));
  arr[0] += 2000;
  const date = new Date(arr[0], arr[1], arr[2]);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

React.render(<App/>, document.querySelector("#myApp"));
