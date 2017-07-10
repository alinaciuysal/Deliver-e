/**
 * Created by Melih Berçin on 7/2/2017.
 */

'use strict';

import UserService from './../../services/user/user.service';

import template from './view-profile.template.html';
import './view-profile.style.css';

class ViewProfileComponent {
    constructor(){
        this.controller = ViewProfileController;
        this.template = template;
    }

    static get name() {
        return 'viewProfile';
    }
}

class ViewProfileController {

    constructor($state, $element, $rootScope, $location, $filter, $window, UserService){
        this.$element = $element;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;
        this.$filter = $filter;
        this.$window = $window;
    }

    initializeController() {
        let ctrl = this;

        // reset error messages
        if (ctrl.profileUpdateErrorUser !== undefined) {
            ctrl.profileUpdateErrorUser = undefined;
        }

        if (ctrl.profileUpdateErrorDeliverer !== undefined) {
            ctrl.profileUpdateErrorDeliverer = undefined;
        }

        if (ctrl.profileUpdateErrorShop !== undefined) {
            ctrl.profileUpdateErrorShop = undefined;
        }

        ctrl.user = {};
        // now populate the location table
        // retrieve these from API
        let availableLocations = [
            {
                name: 'Munich',
                districts: ["Ludwigsvorstadt-Isarvorstadt", "Schwabing-West", "Am-Hart", "Schwanthalerhöhe", "Sendling", "Am Laim"]
            }, {
                name: 'Berlin',
                districts: ["Mitte", "Kreuzberg", "Schönerberg"]
            }
        ];
        ctrl.availableLocations = availableLocations;

        ctrl.UserService.getCurrentUserDetails().then( function(response) {
            let retrievedUser = response.data;
            console.log("ViewProfileController $onInit ", retrievedUser);
            ctrl.user.email = retrievedUser.email;
            ctrl.user.type = retrievedUser.type;

            if(retrievedUser.type === "customer") {
                ctrl.user.name = retrievedUser.name;
                ctrl.user.surname = retrievedUser.surname;
                ctrl.user.location = retrievedUser.location;
                ctrl.user.initialLocation = retrievedUser.location;
                ctrl.user.initialDistrict = retrievedUser.district;
                ctrl.user.address = retrievedUser.address;
            } else if (retrievedUser.type === "deliverer") {
                ctrl.user.name = retrievedUser.name;
                ctrl.user.surname = retrievedUser.surname;
                let filteredDate = ctrl.$filter('date')(retrievedUser.birthday, "dd-MM-yyyy");
                ctrl.user.birthday = filteredDate;
                ctrl.user.address = retrievedUser.address;
                ctrl.user.phone = retrievedUser.phone;
                ctrl.user.maxWeight = retrievedUser.maxWeight;
                ctrl.user.initialLocation = retrievedUser.preferredLocation;
                ctrl.user.initialDistricts = retrievedUser.preferredDistricts;
            } else if (retrievedUser.type === "shop") {
                ctrl.user.shopName = retrievedUser.name;
                ctrl.user.shopAddress = retrievedUser.address;
                ctrl.user.phone = retrievedUser.phone;
            } else {
                console.log("Error occurred onInit profileCtrl");
            }
        });
    }

    changeUserLocationModel() {
        let ctrl = this;
        console.log(ctrl.userProfile.selectedLocationUser.name);
    }

    changeCustomerProfile() {
        let ctrl = this;

        // reset error msg
        if(ctrl.profileUpdateErrorUser !== undefined) {
            ctrl.profileUpdateErrorUser = undefined;
        }

        // reset confirmation msg
        if(ctrl.profileUpdateSuccessUser !== undefined) {
            ctrl.profileUpdateSuccessUser = undefined;
        }

        if (ctrl.user.newPassword !== undefined && ctrl.user.newPasswordAgain !== undefined && ctrl.user.oldPassword !== undefined) {

            if (ctrl.user.oldPassword.length === 0) {
                ctrl.profileUpdateErrorUser = "Please provide your old password";
                return
            }

            if(ctrl.user.newPassword !== ctrl.user.newPasswordAgain) {
                ctrl.profileUpdateErrorUser = "New passwords should match";
                return
            }
        }


        if (ctrl.user.oldPassword !== undefined && (ctrl.user.newPassword === undefined || ctrl.user.newPassword.length === 0 || ctrl.user.newPasswordAgain === undefined || ctrl.user.newPasswordAgain.length === 0 || ctrl.user.oldPassword.length !== 0)) {
            ctrl.profileUpdateErrorUser = "Please provide new password if you want to change the old one";
            return
        }

        // ask use to provide respective information if they do not exist beforehand

        if (ctrl.userProfile !== undefined) {
            if(ctrl.userProfile.selectedDistrictUser === undefined) {
                ctrl.profileUpdateErrorUser = "Please provide your new district";
                return
            }

            if(ctrl.userProfile.selectedLocationUser === undefined) {
                ctrl.profileUpdateErrorUser = "Please provide your location";
                return
            }

        }

        if (ctrl.user.address === undefined || ctrl.user.address.length === 0) {
            ctrl.profileUpdateErrorUser = "Please provide your address";
            return
        }

        if (ctrl.user.name === undefined || ctrl.user.name.length === 0) {
            ctrl.profileUpdateErrorUser = "Please provide your name";
            return
        }

        if (ctrl.user.surname === undefined || ctrl.user.surname.length === 0) {
            ctrl.profileUpdateErrorUser = "Please provide your surname";
            return
        }

        if (ctrl.user.email === undefined || ctrl.user.email.length === 0) {
            ctrl.profileUpdateErrorUser = "Please provide your email";
            return
        }


        // now populate attributes
        let user = {};
        user.name = ctrl.user.name;
        user.type = ctrl.user.type;
        user.surname = ctrl.user.surname;
        user.address = ctrl.user.address;
        user.email = ctrl.user.email;
        user.password = ctrl.user.oldPassword;
        user.newPassword = ctrl.user.newPassword;
        user.location = ctrl.user.initialLocation;
        user.district = ctrl.user.initialDistrict;

        // update if user changes respective fields
        if(ctrl.userProfile !== undefined) {
            if( ctrl.user.initialLocation !== ctrl.userProfile.selectedLocationUser) {
                user.location = ctrl.userProfile.selectedLocationUser.name;
            }
            if( ctrl.user.initialDistrict !== ctrl.userProfile.selectedDistrictUser) {
                user.district = ctrl.userProfile.selectedDistrictUser;
            }
        }

        console.log("user to be submitted: ", user);

        // send a request for update
        ctrl.UserService.updateUser(user).then( function(response) {
            if(response.status === 200) {
                // now reflect the submitted changes in UI
                ctrl.user.name = user.name;
                ctrl.user.type = user.type;
                ctrl.user.surname = user.surname;
                ctrl.user.address = user.address;
                ctrl.user.email = user.email;
                ctrl.user.initiaLocation = user.location;
                ctrl.user.initialDistrict = user.district;
                ctrl.$window.location.reload();
                alert("Changes have been made successfully");
                // refresh header component by broadcasting
                this.$rootScope.$emit("navbar-changed", {});
            } else {
                // TODO: check if provided password match with the one in DB by using respective status codes
                console.log(response);
                ctrl.profileUpdateErrorUser = "Server error occurred or incorrect password, please try again later.";
            }
        });

    }

    changeDelivererProfile() {
        let ctrl = this;

        // reset error msg
        if(ctrl.profileUpdateErrorDeliverer !== undefined) {
            ctrl.profileUpdateErrorDeliverer = undefined;
        }


        if (ctrl.user.newPassword !== undefined && ctrl.user.newPasswordAgain !== undefined && ctrl.user.oldPassword !== undefined) {

            if (ctrl.user.oldPassword.length === 0) {
                ctrl.profileUpdateErrorDeliverer = "Please provide your old password";
                return
            }

            if(ctrl.user.newPassword !== ctrl.user.newPasswordAgain) {
                ctrl.profileUpdateErrorDeliverer = "New passwords should match";
                return
            }
        }

        if (ctrl.user.oldPassword !== undefined && (ctrl.user.newPassword === undefined || ctrl.user.newPassword.length === 0 || ctrl.user.newPasswordAgain === undefined || ctrl.user.newPasswordAgain.length === 0 || ctrl.user.oldPassword.length !== 0)) {
            ctrl.profileUpdateErrorDeliverer = "Please provide new & valid password if you want to change the old one";
            return
        }

        if (ctrl.userProfile !== undefined) {
            if(ctrl.userProfile.selectedDistricts === undefined) {
                ctrl.profileUpdateErrorDeliverer = "Please provide preferred district(s) for delivery";
                return
            }

            if(ctrl.userProfile.selectedLocationDeliverer === undefined) {
                ctrl.profileUpdateErrorDeliverer = "Please provide preferred location for delivery";
                return
            }

        }

        if (ctrl.user.address === undefined || ctrl.user.address.length === 0) {
            ctrl.profileUpdateErrorDeliverer = "Please provide your address";
            return
        }

        if (ctrl.user.name === undefined || ctrl.user.name.length === 0) {
            ctrl.profileUpdateErrorDeliverer = "Please provide your name";
            return
        }

        if (ctrl.user.surname === undefined || ctrl.user.surname.length === 0) {
            ctrl.profileUpdateErrorDeliverer = "Please provide your surname";
            return
        }

        if (ctrl.user.email === undefined || ctrl.user.email.length === 0) {
            ctrl.profileUpdateErrorDeliverer = "Please provide your email";
            return
        }

        // now populate attributes if everything is fine
        let deliverer = {};
        deliverer.name = ctrl.user.name;
        deliverer.type = ctrl.user.type;
        deliverer.surname = ctrl.user.surname;
        deliverer.address = ctrl.user.address;
        deliverer.email = ctrl.user.email;
        deliverer.password = ctrl.user.oldPassword;
        deliverer.newPassword = ctrl.user.newPassword;
        deliverer.preferredLocation = ctrl.user.initialLocation;
        deliverer.districts = ctrl.user.initialDistricts;
        deliverer.maxWeight = ctrl.user.maxWeight;
        deliverer.phone = ctrl.user.phone;

        // update if user changes respective fields
        if(ctrl.userProfile !== undefined) {
            if( ctrl.user.initialLocation !== ctrl.userProfile.selectedLocationDeliverer) {
                deliverer.preferredLocation = ctrl.userProfile.selectedLocationDeliverer.name;
            }
            if( ctrl.user.initialDistrict !== ctrl.userProfile.selectedDistricts) {
                deliverer.preferredDistricts = ctrl.userProfile.selectedDistricts;
            }
        }

        console.log("deliverer to be submitted ", deliverer);

        // send a request for update
        ctrl.UserService.updateUser(deliverer).then( function(response) {
            if(response.status === 200) {
                // now reflect the submitted changes in UI
                ctrl.user.name = deliverer.name;
                ctrl.user.type = deliverer.type;
                ctrl.user.surname = deliverer.surname;
                ctrl.user.address = deliverer.address;
                ctrl.user.email = deliverer.email;
                ctrl.user.initiaLocation = deliverer.location;
                ctrl.user.initialDistricts = deliverer.districts;
                ctrl.$window.location.reload();
                alert("Changes have been made successfully");
                // refresh header component by broadcasting
                this.$rootScope.$emit("navbar-changed", {});
            } else {
                // TODO: check if provided password match with the one in DB by using respective status codes
                console.log(response);
                ctrl.profileUpdateErrorDeliverer = "Server error occurred or incorrect password, please try again later.";
            }
        });
    }

    changeShopProfile() {
        let ctrl = this;
        // reset error msg
        if(ctrl.profileUpdateErrorShop !== undefined) {
            ctrl.profileUpdateErrorShop = undefined;
        }

        if (ctrl.user.newPassword !== undefined && ctrl.user.newPasswordAgain !== undefined && ctrl.user.oldPassword !== undefined) {

            if (ctrl.user.oldPassword.length === 0) {
                ctrl.profileUpdateErrorShop = "Please provide your old password";
                return
            }

            if(ctrl.user.newPassword !== ctrl.user.newPasswordAgain) {
                ctrl.profileUpdateErrorShop = "New passwords should match";
                return
            }
        }

        if (ctrl.user.oldPassword !== undefined &&
            (ctrl.user.newPassword === undefined ||
                ctrl.user.newPassword.length === 0 ||
                ctrl.user.newPasswordAgain === undefined ||
                ctrl.user.newPasswordAgain.length === 0 ||
                ctrl.user.oldPassword.length !== 0)
            ) {

                ctrl.profileUpdateErrorShop = "Please provide new & valid password if you want to change the old one";
                return
            }

        if (ctrl.user.shopAddress === undefined || ctrl.user.shopAddress.length === 0) {
            ctrl.profileUpdateErrorShop = "Please provide shop's address";
            return
        }

        if (ctrl.user.shopName === undefined || ctrl.user.shopName.length === 0) {
            ctrl.profileUpdateErrorShop = "Please provide shop's name";
            return
        }

        if (ctrl.user.phone === undefined || ctrl.user.phone.length === 0) {
            ctrl.profileUpdateErrorShop = "Please provide shop's phone number";
            return
        }

        if (ctrl.user.email === undefined || ctrl.user.email.length === 0) {
            ctrl.profileUpdateErrorShop = "Please provide account's email";
            return
        }

        // now populate attributes if everything is fine
        let shop = {};
        shop.name = ctrl.user.shopName;
        shop.type = ctrl.user.type;
        shop.address = ctrl.user.shopAddress;
        shop.email = ctrl.user.email;
        shop.password = ctrl.user.oldPassword;
        shop.newPassword = ctrl.user.newPassword;
        shop.phone = ctrl.user.phone;

        console.log("shop to be submitted ", shop);

        // send a request for update
        ctrl.UserService.updateUser(shop).then( function(response) {
            if(response.status === 200) {
                // now reflect the submitted changes in UI
                ctrl.user.shopName = shop.name;
                ctrl.user.type = shop.type;
                ctrl.user.shopAddress = shop.address;
                ctrl.user.email = shop.email;
                ctrl.$window.location.reload();
                alert("Changes have been made successfully");
                // refresh header component by broadcasting
                this.$rootScope.$emit("navbar-changed", {});
            } else {
                // TODO: check if provided password match with the one in DB by using respective status codes
                console.log(response);
                ctrl.profileUpdateErrorShop = "Server error occurred or incorrect password, please try again later.";
            }
        });
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    static get $inject(){
        return ['$state', '$element', '$rootScope', '$location', '$filter', '$window', UserService.name];
    }
}

export default ViewProfileComponent;
