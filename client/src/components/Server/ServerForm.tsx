import React, {Component} from 'react';
import DotnetForm from './Dotnet/DotnetForm';

interface IFromProps {
  onChange: (event:any) => void;
  framework: string;
}

export default class ServerForm extends Component<IFromProps, {}> {
    constructor(props: IFromProps) {
        super(props);

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
      switch(this.props.framework) {
        case 'dotnet':
          return (
            <div>
              <DotnetForm onChange={this.props.onChange}/>
            </div>
          )
      }
    }
}
