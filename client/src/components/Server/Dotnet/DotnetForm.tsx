import React, { Component } from 'react';
import WebApiForm from './WebApi/WebApiForm';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IFormState {
    name: string;
    template: string,
    useSwagger: boolean,
    useEfCore: boolean,
}

interface IFromProps {
    onChange: (event:any) => void
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
        }

        this.handleNameChange = this.handleNameChange.bind(this);
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

    render() {
        return (
            <div>
                <TextField
                    id="s-name"
                    label="Server Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    margin="normal"
                />
                
                <FormControl style={{minWidth: '200px'}}>
                    <InputLabel htmlFor="template">Select Template</InputLabel>
                    <Select
                        value={this.state.template}
                        onChange={this.handleTemplateChange}
                        inputProps={{
                        name: 'template',
                        id: 'template',
                        }}
                    >
                        {templates.map(template => <MenuItem value={template}>{template}</MenuItem>)}
                    </Select>
                </FormControl>
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
}