import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'

import Header from './Header';
import TimeItem from './TimeItem';
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
                	<Header first={this.props.first} firstDate={this.props.firstDate} />

                    <TimeItem />

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Timetable);
