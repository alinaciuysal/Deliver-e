/**
 * Created by Ali Naci Uysal on 6/14/2017.
 */

'use strict';
Icons.$inject = ['$mdIconProvider'];

export default function Icons ($mdIconProvider){
    $mdIconProvider
        .icon('logoD', 'src/assets/logo.svg')
        .defaultIconSet("src/assets/mdi.svg");
}