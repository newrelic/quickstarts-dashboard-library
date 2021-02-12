import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class View extends React.Component {
  static getState(props) {
    return {
      quickstart: props.data.quickstarts.find(
        (element) => element.id === props.match.params.handle
      ),
      path: props.match.path,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      !state.quickstart ||
      state.quickstart.id !== props.match.params.handle
    ) {
      return View.getState(props);
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = View.getState(props);
  }

  modalCallback = undefined;

  render() {
    if (!this.state.quickstart) {
      return (
        <div className="container" id="root">
          <div className="album py-2">
            <div className="container" id="root">
              <div className="row py-4">
                <div className="col-8">
                  <h2>Quickstart not found</h2>
                </div>
                <div className="col-4 text-right">
                  <Link className="btn btn-primary" to="/">
                    Back to listing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container" id="root">
        <div className="row header">
          <div className="col-8">
            <h1>New Relic Quickstarts</h1>
          </div>
          <div className="col-4 text-right">
            <Link className="btn btn-primary" to="/">
              Back to listing
            </Link>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-12">
            <h2 className="pt-2 pb-2">{this.state.quickstart.name}</h2>
            <p className="description">{this.state.quickstart.description}</p>
          </div>
          <div className="col-4 pl-4">
            <div className="row">
              {this.state.quickstart.dashboards.map((dashboard) => {
                return dashboard.screenshots.map((screenshot) => {
                  return (
                    <div className="col-12" key={dashboard.name + screenshot}>
                      <img
                        src={`https://newrelic.github.io/quickstarts-dashboard-library/data/${this.state.quickstart.id}/dashboards/${screenshot}`}
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                  );
                });
              })}
            </div>
          </div>
          <div className="col-8">
            <h3>Import into your New Relic account</h3>
            <p>
              To use this dashboard in your New Relic account you can use the{' '}
              <b>Quickstarts App</b> within New Relic. Follow the instructions
              below to get started:{' '}
            </p>
            <p>
              1) Open the New Relic Apps view:{' '}
              <a
                href="https://one.newrelic.com/launcher/nr1-core.home?pane=eyJuZXJkbGV0SWQiOiJucjEtY29yZS5ob21lLXNjcmVlbiJ9&overlay=eyJuZXJkbGV0SWQiOiJjYXRhbG9nLmFwcC1kaXJlY3RvcnkifQ=="
                target="_BLANK"
                rel="noopener noreferrer"
              >
                Open in new window
              </a>
            </p>
            <p>
              2) Select the <b>Quickstarts App</b> from the list of apps. You
              might need to scroll down.
            </p>
            <p>
              <img
                src="./gfx/installation_1.png"
                alt="New Relic Apps screen"
                className="img-fluid"
              />
            </p>
            <p>
              3) Click on the "Add this app" button and select the accounts you
              want to add the app to.
            </p>
            <p>
              <img
                src="./gfx/installation_2.png"
                alt="New Relic Quickstarts App screen"
                className="img-fluid"
              />
            </p>
            <p>
              4) When you've finished adding the app, refresh the screen and go
              to "Apps" again. The quickstarts app should in your list of apps.
            </p>
            <p>5) Open Quickstarts and start importing dashboards.</p>
            <p>
              If you encounter any problems, don't hesitate reach out by{' '}
              <a
                href="https://github.com/newrelic/quickstarts-dashboard-library/issues/new/choose"
                target="_BLANK"
                rel="noopener noreferrer"
              >
                creating a Github issue
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
}

View.propTypes = {
  match: PropTypes.object,
};

export default View;
