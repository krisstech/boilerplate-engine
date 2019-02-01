import React, { Component } from 'react';
import axios from 'axios';

// interface IFormProps {
//     test?: any;
// }

interface IFormState {
    name: string;
    // template: 'classlib' | 'webapi' | 'console'
    template: string
}

const templates = [
    'classlib',
    'webapi',
    'console'
]

export default class DotnetForm extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            template: 'classlib'
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value})
    }

    handleTemplateChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // console.log(event.target.value);
        this.setState(
            {
                template: event.target.value
            }
        )
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // console.log('A name was submitted: ' + this.state.name);
        console.log('Starting request...')

        const apiUrl = 'http://localhost:5000/api';
        axios
            .post(
                `${apiUrl}/dotnet`,
                {
                    name: this.state.name,
                    template: this.state.template
                },
                {
                    responseType: 'blob'
                }
            )
            .then(function (response) {
                console.log(response);

                // This works but is stupid as it creates an additional html element
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `DotnetZipFile.zip`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    }

    handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        console.log('This was typed: ' + this.state.name);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Name: 
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} onKeyUp={this.handleKeyUp} />
                    </label>
                </div>
                <div>
                    <label>
                        Type: 
                        <select name="templates" onChange={this.handleTemplateChange}>
                            {templates.map(template => <option value={template}>{template}</option>)}
                        </select>
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}