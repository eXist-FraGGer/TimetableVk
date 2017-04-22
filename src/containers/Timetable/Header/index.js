import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                	<DayCell title="Понедельник" date="14.03" />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Вторник" date="14.03" />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Среда" date="14.03" />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Четверг" date="14.03" />
                </div>
            	<div className="day-col">
                	<div className="group-cell"><TextCell value="Уч. Группа" /></div>
					<DayCell title="Пятница" date="14.03" />
                </div>
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

export default connect( mapStateToProps, mapDispatchToProps )(Header)