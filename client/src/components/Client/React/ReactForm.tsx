import React, { Component } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IFormState {
    name: string;
    useTypescript: boolean;
}

interface IFromProps {
    onChange: (event:any) => void;
}

export default class ReactForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            name: '',
            useTypescript: true,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypescriptChange = this.handleTypescriptChange.bind(this);

        if (props.onChange)
        {
            props.onChange(
                {
                    clientModel: {
                        name: this.state.name,
                        useTypescript: this.state.useTypescript
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

    handleTypescriptChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(
            {
                useTypescript: event.target.value === 'true'
            }
        )

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    clientModel: {
                        useTypescript: event.target.value === 'true'
                    }
                }
            )
        }
    }

    render() {
        return (
            <div>

                <TextField
                    id="c-name"
                    label="Client Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    margin="normal"
                />
                <FormControl style={{minWidth: '200px'}}>
                    <InputLabel htmlFor="use-typescript">Use Typescript</InputLabel>
                    <Select
                        onChange={this.handleTypescriptChange}
                        inputProps={{
                        name: 'typescript',
                        id: 'use-typescript',
                        }}
                    >
                        <MenuItem key={1} value="true">Yes</MenuItem>
                        <MenuItem key={2} value="false">no</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}