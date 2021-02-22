import React from 'react';
import { Link } from 'react-router-dom';
import InstallationInstructions from '../Shared/Partials/InstallationInstructions';

class Installation extends React.Component {
  render() {
    return (
      <div className="container" id="root">
        <div className="row header">
          <div className="col-8">
            <h1>New Relic Quickstarts</h1>
          </div>
          <div className="col-4 text-right">
            <Link className="btn btn-info" to="/">
              Back to listing
            </Link>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-12">
            <h2 className="pt-2 pb-2">Installation</h2>
          </div>
          <div className="col-12 pl-4">
            <InstallationInstructions />
          </div>
        </div>
      </div>
    );
  }
}

export default Installation;
