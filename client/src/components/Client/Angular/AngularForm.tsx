import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Spinner } from '../..';

interface IFormState {
    name: string;
    loading: boolean;
}

interface IFromProps {
    partial?: boolean;
    onChange?: (event:any) => void;
}

export default class AngularForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            name: '',
            loading: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if (props.onChange)
        {
            props.onChange(
                {
                    clientModel: {
                        name: this.state.name
                    }
                }
            )
        }
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value})

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    clientModel: {
                        name: event.target.value
                    }
                }
            )
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // console.log('A name was submitted: ' + this.state.name);
        console.log('Starting request...')
        this.setState({loading: true})

        const apiUrl = 'http://localhost:5000/api';
        axios
            .post(
                `${apiUrl}/angular`,
                {
                    name: this.state.name
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
                    filename = "AngularAppStarter.zip"
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
        if (this.props.partial)
        {
            return (
                <div>
                    <div>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" />
                </div>
            );
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.loading ? <Spinner /> : ""}
            </div>
        );
    }
}