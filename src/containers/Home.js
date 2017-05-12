import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { Timetable } from '../containers';

import '../style/Home.css'


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                {_.map(new Array(4), (value, index) => {
                    return (
                        <Timetable key={index} first={index===0} weekNumber={index}
                                   firstDate={moment(this.props.firstDate).add(index * 7, 'days')} />
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        firstDate: state.timetable.firstDate,
        holidays: state.timetable.holidays
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Home)
