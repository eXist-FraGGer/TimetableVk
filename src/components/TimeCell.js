import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

class TimeCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <Row>
                <Col sm={6}>
                    <input type="time" />
                </Col>
                <Col sm={6}>
                    <input type="time" />
                </Col>
            </Row>
        );
    }
};

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TimeCell)