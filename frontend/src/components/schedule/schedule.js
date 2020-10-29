import React from 'react';
import { connect } from "react-redux";
import {
    fetchCappers,
    receiveCapper,
    clearCapper
} from '../../actions/capper_actions'
import RingLoader from "react-spinners/RingLoader";
import Nav from '../nav/nav';

class Schedule extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.fetchCappers();
        // this.props.clearCapper();
    }

    render() {
        // if (this.props.cappers.length === 0) {
        //     return (
        //         <div className="sweet-loading">
        //             <RingLoader
        //                 size={150}
        //                 color={"#123abc"}
        //             />
        //         </div>
        //     )
        // }

        return (
            <div>
                <Nav />
                <div>
                    Larry Fitz
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    history: ownProps.history,
    loggedIn: state.session.isAuthenticated,
    username: state.session.user.username,
    cappers: state.entities.cappers,
    capper: state.entities.capper
});

const mapDispatchToProps = dispatch => ({
    fetchCappers: () => dispatch(fetchCappers()),
    receiveCapper: (capper) => dispatch(receiveCapper(capper)),
    clearCapper: () => dispatch(clearCapper())
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);