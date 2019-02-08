import React, {Component} from 'react';
import { DotnetForm } from '..';
import FormSelectBase from '../Shared/FormSelectBase';

const forms = {
    dotnet: 'DotNet',
}

interface IFormState {
  form: string;
}

interface IFromProps {
  partial?: boolean;
  onChange?: (event:any) => void;
}

export default class ServerForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            form: ''
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({form: event.target.value});

        if (this.props.onChange)
        {
          this.props.onChange(
            {
              serverType: event.target.value,
            }
          );
        }
    }

    render() {
        
        switch(this.state.form)
        {
          case 'dotnet':
            return (
              <div>
                <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
                <DotnetForm partial={this.props.partial} onChange={this.props.onChange}/>
              </div>
            )
        }

        return (
          <div>
            <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
          </div>
        )
    }
}
