import React from 'react';

class InstallationInstructions extends React.Component {
  render() {
    return (
      <>
        <p>
          To use the library or import a dashboard into your New Relic account
          you can use the <b>Quickstarts App</b> within New Relic. The
          application will allow you to search the library and import dashboards
          from within New Relic.
        </p>
        <p>Follow the instructions below to get started:</p>
        <p>
          <b>1) Open the New Relic Apps view</b>{' '}
        </p>
        <p>
          <a
            href="https://one.newrelic.com/launcher/nr1-core.home?pane=eyJuZXJkbGV0SWQiOiJucjEtY29yZS5ob21lLXNjcmVlbiJ9&overlay=eyJuZXJkbGV0SWQiOiJjYXRhbG9nLmFwcC1kaXJlY3RvcnkifQ=="
            target="_BLANK"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Click here to open the New Relic Apps view
          </a>
        </p>
        <p>
          <b>2) Select the Quickstarts Application from the list of apps.</b>{' '}
          You might need to scroll down.
        </p>
        <p>
          <img
            src="./gfx/installation_1.png"
            alt="New Relic Apps screen"
            className="img-fluid"
          />
        </p>
        <p className="pt-2">
          <b>
            3) Click on the "Add this app" button and select the accounts you
            want to add the app to.
          </b>
        </p>
        <p>
          <img
            src="./gfx/installation_2.png"
            alt="New Relic Quickstarts App screen"
            className="img-fluid"
          />
        </p>
        <p className="pt-2">
          <b>
            4) When you've finished adding the app, refresh the screen and go to
            "Apps" again. The Quickstarts Application should in your list of
            apps.
          </b>
        </p>
        <p>
          <b>5) Open Quickstarts and start importing dashboards.</b>
        </p>
        <p className="pb-4">
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
      </>
    );
  }
}

export default InstallationInstructions;
