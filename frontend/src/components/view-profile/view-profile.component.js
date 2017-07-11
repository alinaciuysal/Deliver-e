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

    // remove previously-selected districts if user picks another location from dropdown menu
    changeDistrictsUser() {
        let ctrl = this;
        ctrl.userProfile.selectedDistrictUser = null;
    }

    // remove previously-selected districts if deliverer picks another location from dropdown menu
    changeDistrictsDeliverer() {
        let ctrl = this;
        ctrl.userProfile.selectedDistricts = null;
    }

    changeCustomerProfile() {
        let ctrl = this;
        ctrl.resetMessages(ctrl);
        let invalidPw = ctrl.checkPasswordValidity(ctrl.user);
        if (invalidPw !== null) {
            ctrl.profileUpdateErrorUser = invalidPw;
            return;
        }

        let locAndDistrictRequired = ctrl.checkLocationAndDistrictValidityUser(ctrl.userProfile);
        if (locAndDistrictRequired !== null) {
            ctrl.profileUpdateErrorUser = locAndDistrictRequired;
            return;
        }

        let fieldsAreRequired = ctrl.checkFields(ctrl.user);
        if (fieldsAreRequired !== null) {
            ctrl.profileUpdateErrorUser = fieldsAreRequired;
            return;
        }

        // now populate attributes
        let user = {};
        user.name = ctrl.user.name;
        user.type = ctrl.user.type;
        user.surname = ctrl.user.surname;
        user.address = ctrl.user.address;
        user.email = ctrl.user.email;

        // old_password & new_password are used to be consistent with API
        user.old_password = ctrl.user.oldPassword;
        user.new_password = ctrl.user.newPassword;
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
            }
        }).catch(function(response) {
            // ctrl.profileUpdateErrorUser = "Server error occurred or incorrect password, please try again later.";
            ctrl.profileUpdateErrorUser = response.data;
        });

    }

    changeDelivererProfile() {
        let ctrl = this;

        ctrl.resetMessages(ctrl);

        let invalidPw = ctrl.checkPasswordValidity(ctrl.user);
        if (invalidPw !== null) {
            ctrl.profileUpdateErrorDeliverer = invalidPw;
            return;
        }

        let locAndDistrictRequired = ctrl.checkLocationAndDistrictValidityDeliverer(ctrl.userProfile);
        if (locAndDistrictRequired !== null) {
            ctrl.profileUpdateErrorDeliverer = locAndDistrictRequired;
            return;
        }

        let fieldsAreRequired = ctrl.checkFields(ctrl.user);
        if (fieldsAreRequired !== null) {
            ctrl.profileUpdateErrorDeliverer = fieldsAreRequired;
            return;
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

        // now populate attributes if everything is fine
        let deliverer = {};
        deliverer.name = ctrl.user.name;
        deliverer.type = ctrl.user.type;
        deliverer.surname = ctrl.user.surname;
        deliverer.address = ctrl.user.address;
        deliverer.email = ctrl.user.email;
        deliverer.old_password = ctrl.user.oldPassword;
        deliverer.new_password = ctrl.user.newPassword;
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
            }
        }).catch(function(response) {
            // ctrl.profileUpdateErrorUser = "Server error occurred or incorrect password, please try again later.";
            ctrl.profileUpdateErrorDeliverer = response.data;
        });;
    }

    changeShopProfile() {
        let ctrl = this;
        ctrl.resetMessages(ctrl);


        let invalidPw = ctrl.checkPasswordValidity(ctrl.user);
        if (invalidPw !== null) {
            console.log("1");
            ctrl.profileUpdateErrorShop = invalidPw;
            return;
        }

        let fieldsAreRequired = ctrl.checkFieldsShop(ctrl.user);
        if (fieldsAreRequired !== null) {
            console.log("2");
            ctrl.profileUpdateErrorShop = fieldsAreRequired;
            return;
        }


        // now populate attributes if everything is fine
        let shop = {};
        shop.name = ctrl.user.shopName;
        shop.type = ctrl.user.type;
        shop.address = ctrl.user.shopAddress;
        shop.email = ctrl.user.email;
        shop.old_password = ctrl.user.oldPassword;
        shop.new_password = ctrl.user.newPassword;
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
            }
        }).catch(function(response) {
            // ctrl.profileUpdateErrorUser = "Server error occurred or incorrect password, please try again later.";
            ctrl.profileUpdateErrorShop = response.data;
        });
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    checkFieldsShop(user) {
        let result = null;
        if (user.shopAddress === undefined || user.shopAddress.length === 0) {
            result = "Please provide a valid shop address";
            return result;
        }

        if (user.shopName === undefined || user.shopName.length === 0) {
            result = "Please provide a valid shop name";
            return result;
        }

        if (user.phone === undefined || user.phone.length === 0) {
            result = "Please provide a valid shop phone number";
            return result;
        }

        if (user.email === undefined || user.email.length === 0) {
            result = "Please provide a valid account email";
            return result;
        }
        return result;
    }

    checkPasswordValidity(user) {
        let result = null;
        console.log("checkPasswordValidity ", user);

        if (user.oldPassword === undefined || user.oldPassword.length === 0) {
            result = "Please provide your old password to make changes";
            return result;
        }

        if (user.newPassword !== undefined && user.newPasswordAgain !== undefined && user.oldPassword !== undefined) {
            if (user.oldPassword.length === 0) {
                result = "Please provide your old password";
                return result;
            }

            if(user.newPassword !== user.newPasswordAgain) {
                result = "New passwords should match";
                return result;
            }
        }

        if (user.oldPassword !== undefined) {
            if (user.oldPassword.length < 5) {
                result = "Old password length was at least 5 characters long";
                return result;
            }
        }

        if (user.newPassword !== undefined) {
            if (user.newPassword.length < 5) {
                result = "New password length should be at least 5 characters long";
                return result;
            }
        }

        if (user.newPasswordAgain !== undefined) {
            if (user.newPasswordAgain.length < 5) {
                result = "New password length should be at least 5 characters long";
                return result;
            }
        }

        if (user.newPassword !== undefined && user.newPassword.length !== 0) {
            if(user.newPasswordAgain === undefined || user.newPasswordAgain.length === 0) {
                result = "Please provide new password again if you want to change the old one";
                return result;
            }
        }

        if (user.newPasswordAgain !== undefined && user.newPasswordAgain.length !== 0) {
            if(user.newPassword === undefined || user.newPassword.length === 0) {
                result = "Please provide new password first if you want to change the old one";
                return result;
            }
        }

        return result;
    }

    checkLocationAndDistrictValidityUser(userProfile) {
        let result = null;

        // ask use to provide respective information if they do not exist beforehand
        if (userProfile !== undefined) {
            if(userProfile.selectedDistrictUser === undefined) {
                result = "Please provide your new district";
                return result;
            }

            if(userProfile.selectedLocationUser === undefined) {
                result = "Please provide your location";
                return result;
            }
        }
        return result;
    }

    checkLocationAndDistrictValidityDeliverer(userProfile) {
        let result = null;

        // ask use to provide respective information if they do not exist beforehand
        if (userProfile !== undefined) {
            if(userProfile.selectedDistricts === undefined) {
                result = "Please provide your new district";
                return result;
            }

            if(userProfile.selectedLocationDeliverer === undefined) {
                result = "Please provide your location";
                return result;
            }
        }
        return result;
    }

    resetMessages(ctrl) {

        // reset error msg
        if(ctrl.profileUpdateErrorUser !== undefined) {
            ctrl.profileUpdateErrorUser = undefined;
        }

        if(ctrl.profileUpdateErrorShop !== undefined) {
            ctrl.profileUpdateErrorShop = undefined;
        }

        if(ctrl.profileUpdateErrorDeliverer !== undefined) {
            ctrl.profileUpdateErrorDeliverer = undefined;
        }

        // reset confirmation msg
        if(ctrl.profileUpdateSuccessUser !== undefined) {
            ctrl.profileUpdateSuccessUser = undefined;
        }
    }

    checkFields(user) {
        let result = null;
        if (user.address === undefined || user.address.length === 0) {
            result = "Please provide a valid address";
            return result;
        }

        if (user.name === undefined || user.name.length === 0) {
            result = "Please provide a valid name";
            return result;
        }

        if (user.surname === undefined || user.surname.length === 0) {
            result = "Please provide a valid surname";
            return result;
        }

        if (user.email === undefined || user.email.length === 0) {
            result = "Please provide a valid email";
            return result;
        }
        return result;
    }

    static get $inject(){
        return ['$state', '$element', '$rootScope', '$location', '$filter', '$window', UserService.name];
    }
}

export default ViewProfileComponent;
