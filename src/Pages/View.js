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
                  <Link className="btn btn-info" to="/">
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
      <>
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
              <h2 className="pt-2 pb-2">{this.state.quickstart.name}</h2>
            </div>
            <div className="col-8">
              <p className="description">{this.state.quickstart.description}</p>
            </div>
            <div className="col-4 text-right pt-1">
              <Link className="btn btn-primary" to="/installation">
                Installation guide
              </Link>
            </div>
            <div className="col-12 pl-4">
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
          </div>
        </div>
      </>
    );
  }
}

View.propTypes = {
  match: PropTypes.object,
};

export default View;
