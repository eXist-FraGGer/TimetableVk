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

    onClickGetState = () => {
        console.log(JSON.stringify(this.props.state));
    };

    render() {
        const lessonsByWeek = _.groupBy(this.props.lessons, 'indexWeek');

        return (
            <div>
                <div>
                    <button onClick={this.onClickGetState}>Get State</button>
                </div>
                {_.map(new Array(1), (value, index) => {
                    return (
                        <Timetable key={index} first={index===0} indexWeek={index} lessons={lessonsByWeek[index]}
                                   firstDate={moment(this.props.firstDate).add(index * 7, 'days')} />
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        lessons: state.lessons,
        firstDate: state.timetable.firstDate,
        holidays: state.timetable.holidays
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Home)
