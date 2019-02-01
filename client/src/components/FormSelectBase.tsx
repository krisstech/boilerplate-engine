import React from 'react';

interface IFormProps {
    forms: string[],
    handleFormChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const FormSelectBase: React.SFC<IFormProps> = (props: IFormProps) => {
    return (
        <div>
            <p>Select template</p>
            <select name="templates" onChange={props.handleFormChange}>
                <option value=""></option>
                {props.forms.map(form => <option value={form}>{form}</option>)}
            </select>
        </div>
    )    
}

export default FormSelectBase;
