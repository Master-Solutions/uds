import React, {Component} from 'react';
import load from "little-loader";

class TestLoad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      services: {
        s1: {url: 'http://localhost:8080/main.js'}
      }
    };

    window.UDS = {features: {}};
  }

  handleLoad(sId) {
    const url = this.state.services[sId].url;

    //import('../myModule').then(m => console.log(m));

    const config = {
      callback: (err) => {
        if (err) return console.log(err);
        const configure = window.UDS.features[sId].default;
        configure();
        delete window.UDS.features[sId];
        console.log(window.UDS.features);
      }
    };

    load(url, config);
  }

  render() {
    return (
      <ul>
        {Object.keys(this.state.services).map((sId) => {
          return <li key={sId}>
            {this.state.services[sId].url}&nbsp;
            <input type='button' onClick={this.handleLoad.bind(this, sId)} value={'Load'} />
          </li>
        })}
      </ul>
    );
  }

}

export default TestLoad;
