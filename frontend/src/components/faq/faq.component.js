
'use strict';

import template from "./faq.template.html";
import './faq.style.css';


class FaqComponent {
    constructor(){
        this.controller = FaqController;
        this.template = template;
    }

    static get name() {
        return 'faq';
    }
}

class FaqController {
    constructor($state) {
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }
}

export default FaqComponent;