import React, { Component } from "react";
import "./FilterCabinet.scss";
import firebase from "firebase/app";
import "firebase/database";
import { injectIntl } from "react-intl";

class FilterCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCabinet: [],
        };
        let database = firebase.database();
        this.usersRef = database.ref("Cabinet");
    }

    componentDidMount() {
        this.usersRef.on("value", (snapshot) => {
            const arrCabinet = snapshot.val();
            const dataArray = Object.values(arrCabinet);
            this.setState({
                arrCabinet: dataArray,
            });
        });

        this.usersRef.on("child_added", (snapshot) => {
            const newCabinet = snapshot.val();
            this.setState((prevState) => ({
                arrCabinet: [...prevState.arrCabinet, newCabinet],
            }));
        });
    }

    componentWillUnmount() {
        this.usersRef.off();
    }

    handleFilterCabinet = (event) => {
        this.props.filterCabinet(event.target.value);
    };

    render() {
        const { intl } = this.props;
        return (
            <div className="select-cabinet-container">
                {/* <select
                    className="select-cabinet-content"
                    onChange={(event) => {
                        this.handleFilterCabinet(event);
                    }}
                >
                    <option value="1" className="text-center" defaultValue>
                        {intl.formatMessage({ id: "common.find-cabinet" })}
                    </option>
                    {this.state.arrCabinet &&
                        this.state.arrCabinet.map((item, index) => {
                            return (
                                <option value={item.id} key={index}>
                                    {item.nameCabinet}
                                </option>
                            );
                        })}
                </select> */}
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label for="floatingSelect">Works with selects</label>
                </div>
            </div>
        );
    }
}
export default injectIntl(FilterCabinet);
