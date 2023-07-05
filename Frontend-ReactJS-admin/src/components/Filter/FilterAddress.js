import React, { Component } from "react";
import "./FilterAddress.scss"
import firebase from 'firebase/app';
import "firebase/database";
class FilterAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrLocaitions: [],
            isOpenModalCabinet: false,
            isOpenModalEditCabinet: false,
        };
        let database = firebase.database();
        this.usersRef = database.ref('Location');
    }

    componentDidMount() {
        this.usersRef.on('value', (snapshot) => {
            const arrLocaitions = snapshot.val();
            const dataArray = Object.values(arrLocaitions);
            this.setState({
                arrLocaitions: dataArray,
            });
        });

        this.usersRef.on('child_added', (snapshot) => {
            const newLocation = snapshot.val();
            this.setState((prevState) => ({
                arrLocaitions: [...prevState.arrLocaitions, newLocation],
            }));
        });
    }

    componentWillUnmount() {
        this.usersRef.off()
    }

    handleFilterAddress = (event) => {
        //     let copyState = { ...this.state };
        // copyState[id] = (event.target.value) === "true" ? true : false;
        // this.setState({
        //   ...copyState,
        // });
        this.props.filterCabinet(event.target.value);
        console.log("Check value: ", event.target.value)
    };

    render() {
        return (
            <div className="form-select-container" >
                <div className="icon-content">
                    <i className="fas fa-filter"></i>
                </div>
                <select className="form-select-content" onChange={(event) => { this.handleFilterAddress(event); }} >
                    <option defaultValue>Open this select menu</option>
                    {
                        this.state.arrLocaitions && this.state.arrLocaitions.map((item, index) => {
                            return (
                                <option value={item.id} key={index} >{item.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }
}
export default FilterAddress;