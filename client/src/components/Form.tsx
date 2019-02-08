import React, {Component} from 'react';
import ClientForm from './Client/ClientForm';
import ServerForm from './Server/ServerForm';
import FullStackForm from './FullStack/FullStackForm';

const values: string[] = [
  'client',
  'server',
  'full-stack'
]

interface IFormState {
  form: string;
}

export default class Form extends Component<{}, IFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      form: ''
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.selectStack = this.selectStack.bind(this);
  }

  handleFormChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({form: event.target.value});
  }

  render() {
      
      switch(this.state.form)
      {
        case 'client':
          return (
            <div>
              {this.selectStack()}
              <ClientForm />
            </div>
          )
        case 'server':
          return (
            <div>
              {this.selectStack()}
              <ServerForm />
            </div>
          )
        case 'full-stack':
          return (
            <div>
              {this.selectStack()}
              <FullStackForm />
            </div>
          )
      }

      return (
        <div>
          {this.selectStack()}
        </div>
      )
  }

  selectStack = () => {
    return (
      <select name="SelectStack" onChange={this.handleFormChange}>
        <option value=""></option>
        {values.map(value => <option value={value}>{value}</option>)}
      </select>
    )
  }
}
