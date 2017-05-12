import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap'
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
                    <Row xs={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <h3>Неделя №{this.props.weekNumber}</h3>
                    </Row>

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
