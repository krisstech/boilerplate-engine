import React, {Component} from 'react';
import { DotnetForm, ReactForm, AngularForm } from '.';
import FormSelectBase from './FormSelectBase';

const forms = {
    react: 'React',
    dotnet: 'DotNet',
    angular: 'Angular'
}

interface IFormState {
    form: string;
}

export default class FormBase extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            form: ''
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({form: event.target.value});
    }

    render() {
        
        switch(this.state.form)
        {
            case 'dotnet':
                return (
                    <div>
                        <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
                        <DotnetForm />
                    </div>
                )
            case 'react':
                return (
                    <div>
                        <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
                        <ReactForm />
                    </div>
                )
            case 'angular':
                return (
                    <div>
                        <FormSelectBase forms={Object.keys(forms)} handleFormChange={this.handleFormChange} />
                        <AngularForm />
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
