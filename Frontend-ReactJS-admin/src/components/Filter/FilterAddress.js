import React, { Component } from "react";
import "./FilterAddress.scss"
import firebase from 'firebase/app';
import "firebase/database";

class FilterAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCabinets: [],
            isOpenModalCabinet: false,
            isOpenModalEditCabinet: false,
            lockerName: "",
        };
        let database = firebase.database();
        this.usersRef = database.ref('Locker');
    }

    componentDidMount() {
        this.usersRef.on('value', (snapshot) => {
            const arrCabinets = snapshot.val();
            const dataArray = Object.values(arrCabinets);
            this.setState({
                arrCabinets: dataArray,
            });
        });

        this.usersRef.on('child_added', (snapshot) => {
            const newCabinet = snapshot.val();
            this.setState((prevState) => ({
                arrCabinets: [...prevState.arrCabinets, newCabinet],
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
                <select className="form-select-content" onChange={(event) => { this.handleFilterAddress(event); }} >
                    <option defaultValue>Open this select menu</option>
                    {
                        this.state.arrCabinets && this.state.arrCabinets.map((item, index) => {
                            return (
                                <option value={item.id} key={index} >{item.lockerName}
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