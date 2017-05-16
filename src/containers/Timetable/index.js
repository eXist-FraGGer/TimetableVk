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
        const timeItems = _.groupBy(this.props.lessons, 'indexTimeItem');

        return (
            <div>
                <Grid className="" fluid>
                    <Row xs={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <h3>Неделя №{this.props.indexWeek}</h3>
                    </Row>

                	<Header first={this.props.first} firstDate={this.props.firstDate} />

                    {_.map(timeItems, (lessons, index) => {
                        return (
                            <TimeItem key={index} firstDate={this.props.firstDate} lessons={lessons}
                                      indexWeek={this.props.indexWeek} indexTimeItem={+index} />
                        );
                    })}

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
