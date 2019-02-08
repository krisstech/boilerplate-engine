import React, { Component } from 'react';

interface IFormState {
    name: string;
}

interface IFromProps {
    onChange: (event:any) => void;
}

export default class AngularForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            name: '',
        }

        this.handleNameChange = this.handleNameChange.bind(this);

        if (props.onChange)
        {
            props.onChange(
                {
                    clientModel: {
                        name: this.state.name
                    }
                }
            )
        }
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value})

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    clientModel: {
                        name: event.target.value
                    }
                }
            )
        }
    }

    render() {
        return (
            <div>
                <div>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                </div>
            </div>
        );
    }
}