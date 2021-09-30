import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

class ItemList extends Component {

    componentDidCatch(){
        this.setState({
            itemList:null,
            error: true
        })
    }



    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                key = {id}
                className="list-group-item"
                onClick={() => this.props.onItemSelected(id)}> 
                    {label}
                </li>
            )
        });
    }

    render() {

        const {data} = this.props;
        const items = this.renderItems(data);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

const withData = (View, getData) => {
    return class extends Component {

        state={
            data: null,
            error: false
        }
    
        componentDidMount(){
    
            getData()
                .then((data) => {
                    this.setState({
                        data, 
                        error:false
                    });
                })
                .catch(()=>{this.onError()});
        }

        onError(status){
            this.setState({
                itemList:null,
                error:true
            })
        }
        
        render(){

            const {data, error} = this.state;

            if(error) {
                return <ErrorMessage/>
            }
    
            if(!data) {
                return <Spinner/>
            }

           return <View {...this.props} data = {data}/>
        }
    }
}
const {getAllCharacters} = new gotService;
export default withData(ItemList, getAllCharacters);