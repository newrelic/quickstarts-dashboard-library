import React from 'react';

class InstallationInstructions extends React.Component {
  render() {
    return (
      <>
        <p>
          To use the library in your New Relic account you can use the{' '}
          <b>Quickstarts App</b> within New Relic. Follow the instructions below
          to get started:{' '}
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
          2) Select the <b>Quickstarts App</b> from the list of apps. You might
          need to scroll down.
        </p>
        <p>
          <img
            src="./gfx/installation_1.png"
            alt="New Relic Apps screen"
            className="img-fluid"
          />
        </p>
        <p>
          3) Click on the "Add this app" button and select the accounts you want
          to add the app to.
        </p>
        <p>
          <img
            src="./gfx/installation_2.png"
            alt="New Relic Quickstarts App screen"
            className="img-fluid"
          />
        </p>
        <p>
          4) When you've finished adding the app, refresh the screen and go to
          "Apps" again. The quickstarts app should in your list of apps.
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
      </>
    );
  }
}

export default InstallationInstructions;
