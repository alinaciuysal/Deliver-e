
'use strict';

import template from './app-footer.template.html';
import './app-footer.style.css';

class AppFooterComponent {

    constructor($state) {
        this.$state = $state;
        this.controller = AppFooterComponentController;
        this.template = template;
    }

    static get name() {
        return 'appFooter';
    }
}

class AppFooterComponentController {

    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state', '$element'];
    }

    faqPage() {
        var ctrl = this;
        ctrl.$state.go('faq');
    }

    aboutPage() {
        var ctrl = this;
        ctrl.$state.go('about');
    }
}

export default AppFooterComponent;