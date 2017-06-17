
'use strict';

import template from './view-mainpage.template.html';
//import MoviesService from './../../services/movies/movies.service';
import UserService from './../../services/user/user.service';
import MainPageService from './../../services/main/main.service';


class ViewMainPageComponent {
    constructor(){
        this.controller = ViewMainPageComponentController;
        this.template = template;
        bindings: {
            slides: '='
        }
    }

    static get name() {
        return 'viewMainPage';
    }
}

class ViewMainPageComponentController {
    constructor($state, UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        console.log("ViewMainPageComponentController onInit works");
    }


    // edit () {
    //
    //     if (this.UserService.isAuthenticated()) {
    //         let _id = this.movie['_id'];
    //         this.$state.go('movieEdit',{ movieId:_id});
    //     } else {
    //         this.$state.go('login',{});
    //     }
    //
    // };


    // delete() {
    //     if (this.UserService.isAuthenticated()) {
    //         let _id = this.movie['_id'];
    //
    //         this.MoviesService.delete(_id).then(response => {
    //             this.$state.go('movies',{});
    //         });
    //     } else {
    //         this.$state.go('login',{});
    //     }
    // };


    // getPosterURL(){
    //     let posterURL = 'http://placehold.it/32x32';
    //     if (this.movie.hasOwnProperty('posters')) {
    //         if (this.movie.posters.hasOwnProperty('thumbnail')) {
    //             posterURL = this.movie.posters.thumbnail;
    //         } else if (this.movie.posters.hasOwnProperty('profile')) {
    //             posterURL = this.movie.posters.profile;
    //         } else if (this.movie.posters.hasOwnProperty('detailed')) {
    //             posterURL = this.movie.posters.detailed;
    //         } else {
    //             posterURL = this.movie.posters.original;
    //         }
    //     }
    //     return posterURL;
    // }



    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewMainPageComponent;