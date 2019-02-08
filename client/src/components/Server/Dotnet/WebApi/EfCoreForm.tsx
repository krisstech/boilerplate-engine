import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IFormProps {
    handleFormChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const EfCoreForm: React.SFC<IFormProps> = (props: IFormProps) => {

    return (
        <FormControl style={{minWidth: '200px'}}>
            <InputLabel htmlFor="efcore">Use EF Core?</InputLabel>
            <Select
                onChange={props.handleFormChange}
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

export default EfCoreForm;
