import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Spinner } from '..';

interface IFormState {
    name: string;
    useTypescript: boolean,
    loading: boolean
}

export default class ReactForm extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            useTypescript: true,
            loading: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypescriptChange = this.handleTypescriptChange.bind(this);
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value})
    }

    handleTypescriptChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(
            {
                useTypescript: event.target.value === 'true'
            }
        )
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // console.log('A name was submitted: ' + this.state.name);
        console.log('Starting request...')
        this.setState({loading: true})

        const apiUrl = 'http://localhost:5000/api';
        axios
            .post(
                `${apiUrl}/react`,
                {
                    name: this.state.name,
                    useTypescript: this.state.useTypescript
                },
                {
                    responseType: 'blob'
                }
            )
            .then((response) => {
                console.log(response);
                let disposition = response.headers["content-disposition"];
                let filename = "";

                if (disposition && disposition.indexOf("attachment") !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
                        matches = filenameRegex.exec(disposition);
            
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, "");
                    }
                }

                if (!filename)
                {
                    filename = "ReactAppStarter.zip"
                }

                saveAs(new Blob([response.data]), filename);

                this.setState({loading: false});
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Typescript?:
                            <select name="templates" onChange={this.handleTypescriptChange}>
                                <option key={1} value="true">Yes</option>
                                <option key={2} value="false">No</option>
                            </select>
                        </label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.loading ? <Spinner /> : ""}
            </div>
        );
    }
}