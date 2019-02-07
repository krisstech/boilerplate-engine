import React from 'react'
import SwaggerForm from './SwaggerForm';
import EfCoreForm from './EfCoreForm';

interface IFormProps {
  handleSwaggerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleEfCoreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const WebApiForm: React.SFC<IFormProps> = (props: IFormProps) => {
    return (
      <div>
        <SwaggerForm handleFormChange={props.handleSwaggerChange}/>
        <EfCoreForm handleFormChange={props.handleEfCoreChange}/>
      </div>
    );
}

export default WebApiForm;
