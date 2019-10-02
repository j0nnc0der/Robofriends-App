import React, {
    Component
} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundary';
import './app.css';




// State is a object that describe your application, something that  can change and affect our app. Usually lives on the parent component
// Prop are things that come out of state.  State>>Props
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
        // console.log('constructor');
    }


    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
            .then(users => this.setState({
                robots: users
            }));
        // .then(users => { })
        // console.log('check');
        // console.log('componentDidMount');
    }



    onSearchChange = (event) => {
        this.setState({
            searchfield: event.target.value
        })
    }


    render() {
        const {
            robots,
            searchfield
        } = this.state;
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        // console.log('render');
        // console.log(filteredRobots);
        return !robots.length ?
            <h1> Loading </h1> :
            (
                <div className='tc' >
                    <h1 className='f1' > RoboFriends </h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll >
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>

                    </Scroll >

                </div>
            );
    }
}

export default App;