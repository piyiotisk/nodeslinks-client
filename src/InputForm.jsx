import React from 'react';
import axios from 'axios';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeData: '',
            nodeMetadata: '',
            nodeDataFile: undefined,
            nodeMetadataFile: undefined
        };
    }

    fileUpload(file) {
        const url = 'http://localhost:3000/upload'
        const data = new FormData();
        data.append('file', file)
        return axios.post(url, data)
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            [name + 'File']: target.files[0]
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.fileUpload(this.state.nodeDataFile).then((response) => {
            console.log(response.data);
        })
        this.fileUpload(this.state.nodeMetadataFile).then((response) => {
            console.log(response.data);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Nodes Data:
                    <input
                        name="nodeData"
                        type="file"
                        value={this.state.nodeData}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Nodes Metadata:
                    <input
                        name="nodeMetadata"
                        type="file"
                        value={this.state.nodeMetadata}
                        onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default InputForm