import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

interface IFormState {
    name: string;
}

interface IFromProps {
    onChange: (event:any) => void;
}

export default class AngularForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            name: '',
        }

        this.handleNameChange = this.handleNameChange.bind(this);

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

    render() {
        return (

            <TextField
                id="c-name"
                label="Client Name"
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
            />
        );
    }
}