import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'

import Header from './Header';

import '../../style/Timetable.css'


export class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Grid className="" fluid>
                	<Header />
                </Grid>
            </div>
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

export default connect( mapStateToProps, mapDispatchToProps )(Timetable)