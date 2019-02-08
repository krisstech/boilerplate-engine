import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Spinner } from '../..';
import WebApiForm from './WebApi/WebApiForm';

interface IFormState {
    name: string;
    // template: 'classlib' | 'webapi' | 'console'
    template: string,
    useSwagger: boolean,
    useEfCore: boolean,
    loading: boolean
}

interface IFromProps {
    partial?: boolean,
    onChange?: (event:any) => void
}

const templates = [
    'classlib',
    'webapi',
    'console'
]

export default class DotnetForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            name: '',
            template: 'classlib',
            useSwagger: true,
            useEfCore: false,
            loading: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.handleSwaggerChange = this.handleSwaggerChange.bind(this);
        this.handleUseEFCore = this.handleUseEFCore.bind(this);

        if (props.onChange)
        {
            props.onChange(
                {
                    serverModel: {
                        name: this.state.name,
                        template: 'webapi',
                        useSwagger: this.state.useSwagger,
                        useEfCore: this.state.useEfCore,
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
                    serverModel: {
                        name: event.target.value
                    }
                }
            )
        }
    }

    handleTemplateChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(
            {
                template: event.target.value
            }
        )

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    serverModel: {
                        template: event.target.value
                    }
                }
            )
        }
    }

    handleSwaggerChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(
            {
                useSwagger: event.target.value === 'true'
            }
        )

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    serverModel: {
                        useSwagger: event.target.value === 'true'
                    }
                }
            )
        }
    }

    handleUseEFCore(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(
            {
                useEfCore: event.target.value === 'true'
            }
        )

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    serverModel: {
                        useEfCore: event.target.value === 'true'
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
                `${apiUrl}/dotnet`,
                {
                    name: this.state.name,
                    template: this.state.template,
                    useSwagger: this.state.useSwagger
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
                    filename = "DotnetAppStarter.zip"
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
                            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
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
                    {
                        this.state.template === 'webapi' ?
                        <WebApiForm 
                            handleEfCoreChange={this.handleUseEFCore}
                            handleSwaggerChange={this.handleSwaggerChange}
                        /> :
                        null
                    }
                </div>
            );
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name: 
                            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
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
                    {
                        this.state.template === 'webapi' ?
                        <WebApiForm 
                            handleEfCoreChange={this.handleUseEFCore}
                            handleSwaggerChange={this.handleSwaggerChange}
                        /> :
                        null
                    }
                    
                    <input type="submit" value="Submit" />
                </form>
                {this.state.loading ? <Spinner /> : ""}
            </div>
        );
    }
}