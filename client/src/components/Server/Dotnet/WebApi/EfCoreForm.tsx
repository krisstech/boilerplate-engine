import React, { Component } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IFormProps {
    handleFormChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

interface IState {
    value: string;
}
class EfCoreForm extends Component<IFormProps, IState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            value: 'true'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ value: event.target.value })

        this.props.handleFormChange(event);
    }

    render() {
        return (
            <FormControl style={{ minWidth: '200px' }}>
                <InputLabel htmlFor="efcore">Use EF Core?</InputLabel>
                <Select
                    value={this.state.value}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'efcore',
                        id: 'efcore',
                    }}
                >
                    <MenuItem key={1} value="true">Yes</MenuItem>
                    <MenuItem key={2} value="false">No</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

export default EfCoreForm;
