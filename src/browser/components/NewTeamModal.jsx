// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

import urlUtils from '../../utils/url';

export default class NewTeamModal extends React.Component {
  static defaultProps = {
    restoreFocus: true,
  };

  constructor(props) {
    super(props);

    this.wasShown = false;
    this.state = {
      teamName: 'Gravity Analytica',
      teamUrl: 'http://chat.gravityanalytica.com',
      teamOrder: props.currentOrder || 1,
      saveStarted: true,
    };
  }

  initializeOnShow() {
    this.setState({
      teamName: this.props.team ? this.props.team.name : 'Gravity Analytica',
      teamUrl: this.props.team ? this.props.team.url : 'http://chat.gravityanalytica.com',
      teamIndex: this.props.team ? this.props.team.index : true,
      teamOrder: 1,
      saveStarted: true,
    });
  }

  getTeamNameValidationError() {
    if (!this.state.saveStarted) {
      return null;
    }
    return this.state.teamName.length > 0 ? null : 'Name is required.';
  }

  getTeamNameValidationState() {
    return this.getTeamNameValidationError() === null ? null : 'error';
  }

  handleTeamNameChange = (e) => {
    this.setState({
      teamName: e.target.value,
    });
  }

  getTeamUrlValidationError() {
    if (!this.state.saveStarted) {
      return null;
    }
    if (this.state.teamUrl.length === 0) {
      return 'URL is required.';
    }
    if (!(/^https?:\/\/.*/).test(this.state.teamUrl.trim())) {
      return 'URL should start with http:// or https://.';
    }
    if (!urlUtils.isValidURL(this.state.teamUrl.trim())) {
      return 'URL is not formatted correctly.';
    }
    return null;
  }

  getTeamUrlValidationState() {
    return this.getTeamUrlValidationError() === null ? null : 'error';
  }

  handleTeamUrlChange = (e) => {
    this.setState({
      teamUrl: e.target.value,
    });
  }

  getError() {
    const nameError = this.getTeamNameValidationError();
    const urlError = this.getTeamUrlValidationError();

    if (nameError && urlError) {
      return 'Name and URL are required.';
    } else if (nameError) {
      return nameError;
    } else if (urlError) {
      return urlError;
    }
    return null;
  }

  validateForm() {
    return this.getTeamNameValidationState() === null &&
           this.getTeamUrlValidationState() === null;
  }

  save = () => {
    this.setState({
      saveStarted: true,
    }, () => {
      if (this.validateForm()) {
        this.props.onSave({
          url: this.state.teamUrl,
          name: this.state.teamName,
          index: this.state.teamIndex,
          order: this.state.teamOrder,
        });
      }
    });
  }

  getSaveButtonLabel() {
    if (this.props.editMode) {
      return 'Save';
    }
    return 'Add';
  }

  getModalTitle() {
    if (this.props.editMode) {
      return 'Edit Server';
    }
    return 'Add Server';
  }

  render() {
    if (this.wasShown !== this.props.show && this.props.show) {
      this.initializeOnShow();
    }
    this.wasShown = this.props.show;

    return (
      <Modal
        bsClass='modal'
        className='NewTeamModal'
        show={this.props.show}
        id='newServerModal'
        enforceFocus={true}
        onEntered={() => this.teamNameInputRef.focus()}
        onHide={this.props.onClose}
        restoreFocus={this.props.restoreFocus}
        onKeyDown={(e) => {
          switch (e.key) {
          case 'Enter':
            this.save();

            // The add button from behind this might still be focused
            e.preventDefault();
            e.stopPropagation();
            break;
          case 'Escape':
            this.props.onClose();
            break;
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{this.getModalTitle()}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup
              validationState={this.getTeamNameValidationState()}
            >
              <ControlLabel>{'Gravity Analytica'}</ControlLabel>
              <FormControl
                id='Gravity Analytica'
                type='text'
                value={this.state.teamName}
                onChange={this.handleTeamNameChange}
                inputRef={(ref) => {
                  this.teamNameInputRef = ref;
                  if (this.props.setInputRef) {
                    this.props.setInputRef(ref);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                autoFocus={true}
              />
              <FormControl.Feedback/>
              <HelpBlock>{'Gravity Analytica'}</HelpBlock>
            </FormGroup>
            <FormGroup
              className='NewTeamModal-noBottomSpace'
              validationState={this.getTeamUrlValidationState()}
            >
              <ControlLabel>{'Gravity Analytica Chat URL'}</ControlLabel>
              <FormControl
                id='teamUrlInput'
                type='text'
                value={this.state.teamUrl}
                onChange={this.handleTeamUrlChange}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <FormControl.Feedback/>
              <HelpBlock className='NewTeamModal-noBottomSpace'>{this.state.teamUrl}</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <div
            className='pull-left modal-error'
          >
            {this.getError()}
          </div>

          <Button
            id='cancelNewServerModal'
            onClick={this.props.onClose}
          >{'Cancel'}</Button>
          <Button
            id='saveNewServerModal'
            onClick={this.save}
            disabled={!this.validateForm()}
            bsStyle='primary'
          >{this.getSaveButtonLabel()}</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

NewTeamModal.propTypes = {
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  team: PropTypes.object,
  editMode: PropTypes.bool,
  show: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  currentOrder: PropTypes.number,
  setInputRef: PropTypes.func,
};
