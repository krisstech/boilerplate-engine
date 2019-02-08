import React, { Component } from 'react';

interface IFormState {
    name: string;
    useTypescript: boolean;
}

interface IFromProps {
    onChange: (event:any) => void;
}

export default class ReactForm extends Component<IFromProps, IFormState> {
    constructor(props: IFromProps) {
        super(props);

        this.state = {
            name: '',
            useTypescript: true,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypescriptChange = this.handleTypescriptChange.bind(this);

        if (props.onChange)
        {
            props.onChange(
                {
                    clientModel: {
                        name: this.state.name,
                        useTypescript: this.state.useTypescript
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

    handleTypescriptChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(
            {
                useTypescript: event.target.value === 'true'
            }
        )

        if (this.props.onChange)
        {
            this.props.onChange(
                {
                    clientModel: {
                        useTypescript: event.target.value === 'true'
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
                <div>
                    <label>
                        Typescript?:
                        <select name="templates" onChange={this.handleTypescriptChange}>
                            <option key={1} value="true">Yes</option>
                            <option key={2} value="false">No</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }
}