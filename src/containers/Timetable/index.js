import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'
import _ from 'lodash';

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

                    {_.map(this.props.allLessons, (lessons, index) => {
                        return (
                            <TimeItem key={index} firstDate={this.props.firstDate}
                                      lessons={lessons} indexTimeItem={index} />
                        );
                    })}

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allLessons: state.lessons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Timetable);
