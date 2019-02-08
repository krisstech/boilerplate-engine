import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IFormProps {
    handleFormChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SwaggerForm: React.SFC<IFormProps> = (props: IFormProps) => {
  return (
    <FormControl style={{minWidth: '200px'}}>
        <InputLabel htmlFor="swagger">Use Swagger UI?</InputLabel>
        <Select
            onChange={props.handleFormChange}
            inputProps={{
            name: 'swagger',
            id: 'swagger',
            }}
        >
            <MenuItem key={1} value="true">Yes</MenuItem>
            <MenuItem key={2} value="false">No</MenuItem>
        </Select>
    </FormControl>
);
}

export default SwaggerForm;
