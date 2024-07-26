import { IoHomeOutline } from "react-icons/io5";
import { RiMovie2Fill } from "react-icons/ri";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";

export const navigation = [
  {
    label: "Tv Shows",
    href: 'tv',
    icon : <PiTelevisionSimpleBold/>
  },
  {
    label: "Movies",
    href: 'movies',
    icon : <RiMovie2Fill/>
  }
];

export const mobileNavigation = [
  {
    label : "Home",
    href : "/",
    icon : <IoHomeOutline/>
  },
  ...navigation,
  {
    label : "Search",
    href : "/search",
    icon : <IoSearchSharp/>
  }
];
