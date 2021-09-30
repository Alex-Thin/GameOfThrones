import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import './app.css';
import gotService from '../../services/gotService';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomCharacter: true,
        error: false, 
        selectedHouse: 20
    };


    componentDidCatch() {
        this.setState({
            error:true
        })
    }

    toggleRandomCharacter=() => {
        this.setState((state) => {
            return {
                showRandomCharacter: !state.showRandomCharacter
            }
        });
    }


    render() {

        const char = this.state.showRandomCharacter? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router> 
                <div className='app'>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button 
                                color = "info" 
                                type = 'btn'
                                className = 'btn-toggle'
                                onClick ={this.toggleRandomCharacter}>Toggle random character</Button>
                        </Col>
                    </Row>
                    <Switch>
                    <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact />
                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/books' component={BooksPage} exact/>
                    <Route path='/books/:id' render={
                        ({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}
                    }/>
                    <Route path='/houses' component={HousesPage}/>    
                    <Redirect to='/'></Redirect>
                    </Switch>   
                </Container>
                </div>
            </Router>
        );
    }

    toggleCharacter=(block)=>{
        if (block.style.display == "none") {

        }else block.style.display = "none";
    }
        
}
