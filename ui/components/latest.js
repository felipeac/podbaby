import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import PodcastList from './podcasts';

export class Latest extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.latest.getLatestPodcasts());
    this.props.history.registerTransitionHook(this.handleLeavePage.bind(this));
  }

  handleLeavePage() {
    const { dispatch, podcasts } = this.props;
    if (podcasts.length > 0) {
      dispatch(actions.podcasts.unloadPodcasts());
    }
  }

  handleSelectPage(event, selectedEvent) {
    event.preventDefault();
    const { dispatch } = this.props;
    const page = selectedEvent.eventKey;
    dispatch(actions.latest.getLatestPodcasts(page));
  }

  render() {
    return <PodcastList actions={actions}
                        onSelectPage={this.handleSelectPage.bind(this)}
                        showChannel={true} {...this.props} />;
  }
}

Latest.propTypes = {
  podcasts: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { podcasts, showDetail, page, isLoading } = state.podcasts;
  return {
    podcasts: podcasts || [],
    showDetail,
    isLoading,
    page,
    player: state.player
  };
};

export default connect(mapStateToProps)(Latest);