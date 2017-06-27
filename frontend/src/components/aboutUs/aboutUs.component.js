
'use strict';

import template from './aboutUs.template.html';
import './aboutUs.style.css';

class AboutUsComponent {
    constructor(){
        this.controller = AboutUsComponentController;
        this.template = template;
    }

    static get name() {
        return 'aboutUs';
    }
}

class AboutUsComponentController{
    constructor(){
        this.text = "AboutUsComponentController TEXT";
    }

    static get $inject(){
        return ['$state', '$element'];
    }
}

export default AboutUsComponent;