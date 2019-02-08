import React, {Component} from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClientForm from './Client/ClientForm';
import ServerForm from './Server/ServerForm';
import { Spinner } from './Shared';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Grid, InputLabel, Select, TextField, MenuItem, FormControl } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  formControl: {
    minWidth: '200px'
  }
});

const appTypes: string[] = [
  'client',
  'server',
  'full-stack'
];

var clientFrameworks: string[] = [
  'react',
  'angular'
]

var serverFrameworks: string[] = [
  'dotnet'
]

interface IState {
  activeStep: number;
  appType: string;
  clientFramework: string;
  serverFramework: string;

  clientModel: any;
  serverModel: any;
  fullStackName: string;
  loading: boolean;
}

interface IProps {
  classes: any
}

class StepperForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeStep: 0,
      appType: '',
      clientFramework: '',
      serverFramework: '',
      clientModel: {},
      serverModel: {},
      fullStackName: '',
      loading: false
    }

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.getSteps = this.getSteps.bind(this);

    this.onAppTypeChanged = this.onAppTypeChanged.bind(this);
    this.onClientFrameworkChanged = this.onClientFrameworkChanged.bind(this);
    this.onServerFrameworkChanged = this.onServerFrameworkChanged.bind(this);
    this.getClientFrameworkSelect = this.getClientFrameworkSelect.bind(this);
    this.getServerFrameworkSelect = this.getServerFrameworkSelect.bind(this);
    this.onClientFormChange = this.onClientFormChange.bind(this);
    this.onServerFormChange = this.onServerFormChange.bind(this);
    this.onFSNameChange = this.onFSNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onAppTypeChanged(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({appType: event.target.value});
  }

  onClientFrameworkChanged(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({clientFramework: event.target.value});
  }

  onServerFrameworkChanged(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({serverFramework: event.target.value});
  }

  onClientFormChange(event: any) {
    let model = event.clientModel;

    if (model) {
      let current = this.state.clientModel;
      Object.assign(current, model);
      this.setState({clientModel: current})
    }
  }

  onServerFormChange(event: any) {
    let model = event.serverModel;

    if (model) {
      let current = this.state.serverModel;
      Object.assign(current, model);
      this.setState({serverModel: current})
    }
  }

  onFSNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({fullStackName: event.target.value})
  }

  handleNext() {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack() {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));

    console.log(this.state);
  };

  handleReset() {
    this.setState({
      activeStep: 0,
      appType: '',
      clientFramework: '',
      serverFramework: '',
      clientModel: {},
      serverModel: {},
      fullStackName: '',
    });
  };

  handleSubmit() {
    console.log('Starting request...')
    this.setState({loading: true})

    const apiUrl = 'http://localhost:5000/api';
    let payload: {};
    let endpoint: string;

    if (this.state.appType === 'client') {
      payload = this.state.clientModel;
      endpoint = this.state.clientFramework;
    }
    else if (this.state.appType === 'server') {
      payload = this.state.serverModel;
      endpoint = this.state.serverFramework;
    }
    else {
      payload = {
        name: this.state.fullStackName,
        clientType: this.state.clientFramework,
        clientModel: this.state.clientModel,
        serverType: this.state.serverFramework,
        serverModel: this.state.serverModel
      };
      endpoint = 'fullstack'
    }

    axios
      .post(
          `${apiUrl}/${endpoint}`,
          payload,
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
              filename = "AngularAppStarter.zip"
          }

          saveAs(new Blob([response.data]), filename);

          this.setState({loading: false});
      })
      .catch((error) => {
          console.log(error);
          this.setState({loading: false});
      });
  }

  getSteps(): string[] {
    return [
      'Select App Type', 
      'Choose Framework', 
      'Fill in the options'
    ];
  }

  getClientFrameworkSelect() {
    return (
      <FormControl className={this.props.classes.formControl}>
        <InputLabel htmlFor="select-client">Select client</InputLabel>
        <Select
          value={this.state.clientFramework}
          onChange={this.onClientFrameworkChanged}
          inputProps={{
            name: 'client',
            id: 'select-client',
          }}
        >
          <MenuItem value=""></MenuItem>
          {clientFrameworks.map(value => <MenuItem value={value}>{value}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }

  getServerFrameworkSelect() {
    return (
      <FormControl className={this.props.classes.formControl}>
        <InputLabel htmlFor="select-server">Select server</InputLabel>
        <Select
          value={this.state.serverFramework}
          onChange={this.onServerFrameworkChanged}
          inputProps={{
            name: 'server',
            id: 'select-server',
          }}
        >
          <MenuItem value=""></MenuItem>
          {serverFrameworks.map(value => <MenuItem value={value}>{value}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }

  getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <div>
            <Typography>You can opt to create either a client, server or full-stack app template</Typography>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="select-stack">Select stack</InputLabel>
              <Select
                value={this.state.appType}
                onChange={this.onAppTypeChanged}
                inputProps={{
                  name: 'stack',
                  id: 'select-stack',
                }}
              >
                <MenuItem value=""></MenuItem>
                {appTypes.map(value => <MenuItem value={value}>{value}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        );
      case 1:
        switch(this.state.appType)
        {
          case 'client':
            return (
              <div>
                <Typography>Select the framework for the selected app type. (For full stack select both what client and what server to use)</Typography>
                {this.getClientFrameworkSelect()}
              </div>
            )
          case 'server':
            return (
              <div>
                <Typography>Select the framework for the selected app type. (For full stack select both what client and what server to use)</Typography>
                {this.getServerFrameworkSelect()}
              </div>
            )
          case 'full-stack':
            return (
              <div>
                <Typography>Select the framework for the selected app type. (For full stack select both what client and what server to use)</Typography>
                {this.getClientFrameworkSelect()}
                {this.getServerFrameworkSelect()}
              </div>
            )
        }
        return (
          <div>
            <Typography>Select a valid app type in the previous step</Typography>
          </div>
        );
      case 2:
        switch(this.state.appType)
        {
          case 'client':
            return (
              <div>
                <Typography>Fill in the details for the selected framework</Typography>
                <ClientForm 
                  framework={this.state.clientFramework}
                  onChange={this.onClientFormChange}
                />
              </div>
            )
          case 'server':
            return (
              <div>
                <Typography>Fill in the details for the selected framework</Typography>
                <ServerForm 
                  framework={this.state.serverFramework}
                  onChange={this.onServerFormChange}
                />
              </div>
            )
          case 'full-stack':
            return (
              <div>
                <Typography>Fill in the details for the selected frameworks</Typography>
                <Grid container spacing={16} >
                  <Grid item xs={12} >
                    <TextField
                      id="fs-name"
                      label="App Name"
                      value={this.state.fullStackName}
                      onChange={this.onFSNameChange}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom>Client</Typography>
                    <ClientForm 
                      framework={this.state.clientFramework}
                      onChange={this.onClientFormChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
                  <Typography variant="h5" gutterBottom>Server</Typography>
                    <ServerForm 
                      framework={this.state.serverFramework}
                      onChange={this.onServerFormChange}
                    />
                  </Grid>
                </Grid>
              </div>
            )
        }
        return `Fill in the details for the selected framework(-s)`;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>

                {this.getStepContent(index)}

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>

            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>

            <Button onClick={this.handleSubmit} className={classes.button}>
              Submit
            </Button>
          </Paper>
        )}
        {this.state.loading ? <Spinner /> : ""}
      </div>
    );
  }
}

export default withStyles(styles)(StepperForm);
