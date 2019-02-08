import React, {Component} from 'react';
import ClientForm from '../Client/ClientForm';
import ServerForm from '../Server/ServerForm';
import axios from 'axios';
import { Spinner } from '..';

interface IFormState {
    name: string;
    clientModel: any;
    clientType: string;
    serverModel: any;
    serverType: string;
    loading: boolean;
}

export default class FullStackForm extends Component<{}, IFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            clientModel: {},
            clientType: '',
            serverModel: {},
            serverType: '',
            loading: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClientFormChange = this.handleClientFormChange.bind(this);
        this.handleServerFormChange = this.handleServerFormChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({name: event.target.value})
    }

    handleClientFormChange(event: any) {
      let type = event.clientType;
      let model = event.clientModel;

      if (type) {
        this.setState({clientType: type})
      }

      if (model) {
        let current = this.state.clientModel;
        Object.assign(current, model);
        this.setState({clientModel: current})
      }
    }

    handleServerFormChange(event: any) {
      let type = event.serverType;
      let model = event.serverModel;

      if (type) {
        this.setState({serverType: type})
      }

      if (model) {
        let current = this.state.serverModel;
        Object.assign(current, model);
        this.setState({serverModel: current})
      }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      console.log('Starting request...')

      this.setState({loading: true})

      const apiUrl = 'http://localhost:5000/api';
      axios
        .post(
          `${apiUrl}/fullstack`,
          {
            name: this.state.name,
            clientType: this.state.clientType,
            clientModel: this.state.clientModel,
            serverType: this.state.serverType,
            serverModel: this.state.serverModel
          },
          {
              responseType: 'blob'
          }
        )
        .then((response) => {
          console.log(response);
          let disposition = response.headers["content-disposition"];
          let filename = "";

          if (disposition && disposition.indexOf("attachment") !== -1) {
              let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
                  matches = filenameRegex.exec(disposition);
      
              if (matches != null && matches[1]) {
                  filename = matches[1].replace(/['"]/g, "");
              }
          }

          if (!filename)
          {
              filename = "full-stack-app.zip"
          }

          saveAs(new Blob([response.data]), filename);

          this.setState({loading: false});
        })
        .catch((error) => {
          console.log(error);
          this.setState({loading: false});
        });

      event.preventDefault();
    }

    render() {
        
        return (
          <div>

            <form onSubmit={this.handleSubmit}>
              <div>
                  <label>
                      Name: 
                      <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                  </label>
              </div>
              
              <div>
                <ClientForm onChange={this.handleClientFormChange} partial={true}/>
                <ServerForm onChange={this.handleServerFormChange} partial={true}/>
              </div>
                    
              <input type="submit" value="Submit" />
            </form>
            {this.state.loading ? <Spinner /> : ""}
          </div>
        )
    }
}
