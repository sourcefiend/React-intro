import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyA4KFF__vfcauv-1FFmf98EbZyWlELmwvM';

// Create a new component. This component should produce
// some HTML
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) =>  {
            this.setState({ 
                videos: videos, 
                selectedVideo: videos[0]
            });
        // this.setState({ videos: videos });    
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 750);
         
        return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch}/>
            <VideoDetail video = {this.state.selectedVideo} />
            <VideoList
                onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
                videos = {this.state.videos}  />
        </div>
        );
    }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));

/* RECAP ON IMPORTANT THINGS:
- difference between a class based component and a function based component:
    = > class is used whenever we want to have a concept of state
    = > we can use functional components whenever we have simple components that just 
    take some number of properties and return some amount of static JSX

- difference between initializing state  ( in the constructor ) and then changing it after 
*/ 