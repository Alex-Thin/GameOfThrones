import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item:null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDatailsLoaded = (item) => {
        this.setState({
            item, 
            loading:false
        })
    }

    updateItem() {
        const{itemId, getData} = this.props;
        if (!itemId){
            return;
        }
        getData(itemId)
            .then((item)=> {
                this.setState({item})
            })
    }

    onError() {
        this.setState({
            item:null,
            error: false
        })
    }

    render() {

        if (!this.state.item) {
            return <span className="select-error">Select an item</span>
        }

        const {item} = this.state;
        const {name} = item;

        // if (this.state.loading) {
        //     return (
        //         <div className="char-details rounded">
        //             <Spinner/>
        //         </div>
        //     )
        // }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    }
}