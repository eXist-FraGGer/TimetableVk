import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { TextCell, DayCell } from '../../../components';

import '../../../style/Header.css';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="header">
                <div className="time-cell"><TextCell value="Часы занятий" /></div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
                	<DayCell first={this.props.first}
                             title="Понедельник"
                             date={this.props.firstDate} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Вторник" date={moment(this.props.firstDate).add(1, 'day')} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Среда" date={moment(this.props.firstDate).add(2, 'day')} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Четверг" date={moment(this.props.firstDate).add(3, 'day')} />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Пятница" date={moment(this.props.firstDate).add(4, 'day')} />
                </div>
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

export default connect( mapStateToProps, mapDispatchToProps )(Header);
