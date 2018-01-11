import React from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'antd';


class RenameFilePopoverContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileNewName: '',
    };
  }

  _onChange = (ev) => {
    this.setState({
      fileNewName: ev.target.value,
    });
  };

  render() {
    return (
      <div>
        <div>
          <label>Enter new file name:</label>
          <Input
            size="small"
            onChange={this._onChange}
            value={this.state.fileNewName}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              this.props.onOK(this.state.fileNewName);
            }}
          >
            Rename File
          </Button>
        </div>
      </div>
    );
  }
}

export default RenameFilePopoverContent;
