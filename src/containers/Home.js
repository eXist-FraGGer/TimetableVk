import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Timetable />
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

export default connect( mapStateToProps, mapDispatchToProps )(Home)