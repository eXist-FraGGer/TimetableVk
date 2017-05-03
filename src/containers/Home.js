import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';

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
                <Timetable first firstDate={this.props.firstDate} />
                {/*<Timetable firstDate={moment(this.props.firstDate).add(7, 'days')} />
                <Timetable firstDate={moment(this.props.firstDate).add(14, 'days')} />
                <Timetable firstDate={moment(this.props.firstDate).add(21, 'days')} />*/}
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
