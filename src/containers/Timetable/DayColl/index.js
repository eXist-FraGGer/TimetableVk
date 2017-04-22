import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';

import { TextCell } from '../../../components';

import '../../../style/DayColl.css'


export class DayColl extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Col sm={2}>
                <Col sm={4}><TextCell value="Уч. Группы" /></Col>
                <Col sm={8}><TextCell value="Понедельник" /></Col>
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

export default connect( mapStateToProps, mapDispatchToProps )(DayColl)