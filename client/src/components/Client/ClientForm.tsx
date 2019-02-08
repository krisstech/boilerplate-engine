import React, {Component} from 'react';
import { ReactForm, AngularForm } from '..';
import FormSelectBase from '../Shared/FormSelectBase';

const forms = {
    react: 'React',
    angular: 'Angular'
}

interface IFormState {
  form: string;
}

interface IFromProps {
  partial?: boolean;
  onChange?: (event:any) => void
}

export default class ClientForm extends Component<IFromProps, IFormState> {
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
              clientType: event.target.value,
            }
          );
        }
    }

    render() {
        
        switch(this.state.form)
        {
            case 'react':
                return (
                    <div>
                        <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
                        <ReactForm partial={this.props.partial} onChange={this.props.onChange}/>
                    </div>
                )
            case 'angular':
                return (
                    <div>
                        <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
                        <AngularForm partial={this.props.partial} onChange={this.props.onChange}/>
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
