import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { TextCell, TimeCell } from '../../../components';

import '../../../style/TimesColl.css'


export class TimesColl extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Col sm={2}>
                <TextCell value="Часы занятий" />
                <TextCell value="08:00 - 09:20" />
                <TextCell value="08:00 - 09:20" />
                <TextCell value="08:00 - 09:20" />
                <TextCell value="08:00 - 09:20" />
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TimesColl)