import React, {Component} from 'react';
import ReactForm from './React/ReactForm';
import AngularForm from './Angular/AngularForm';

interface IFromProps {
  onChange: (event:any) => void
  framework: string;
}

export default class ClientForm extends Component<IFromProps, {}> {
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
              clientType: event.target.value,
            }
          );
        }
    }

    render() {

        switch(this.props.framework)
        {
            case 'react':
                return (
                    <div>
                        <ReactForm onChange={this.props.onChange}/>
                    </div>
                )
            case 'angular':
                return (
                    <div>
                        <AngularForm onChange={this.props.onChange}/>
                    </div>
                )
        }
        
    }
}
