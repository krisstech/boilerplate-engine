import React from 'react';

interface IFormProps {
    handleFormChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const EfCoreForm: React.SFC<IFormProps> = (props: IFormProps) => {
  return (
    <div>
        <label>
            Add EF Core?:
            <select name="templates" onChange={props.handleFormChange}>
                <option key={1} value="true">Yes</option>
                <option key={2} value="false">No</option>
            </select>
        </label>
    </div>
);
}

export default EfCoreForm;
