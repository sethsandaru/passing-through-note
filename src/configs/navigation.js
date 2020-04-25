/********************************
 * Navigation Items Configuration
 * @author Phat Tran <phattranminh96@gmail.com>
 * @description This file is contains the navigation's configuration.
 ********************************/
import NavigationItem from "@/classes/NavigationItem";

const HOME_NAV_ITEMS = [
    new NavigationItem('home', 'Home'),
    new NavigationItem('about', 'About Us'),
];

const NOTE_NAV_ITEMS = [
    new NavigationItem('home', 'Home'),
    // more in middle later...

    //
    new NavigationItem('about', 'About Us'),
];

export {
    HOME_NAV_ITEMS,
    NOTE_NAV_ITEMS
}