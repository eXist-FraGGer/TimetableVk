import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class TimeCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

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
}

export default TimeCell;
