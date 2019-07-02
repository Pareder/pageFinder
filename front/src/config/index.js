import HomeIcon from '@material-ui/icons/Home';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import TextFieldsIcon from '@material-ui/icons/TextFields';

const config = {
  apiServer: '',
  menuItems: [
    {
      link: '/',
      icon: HomeIcon,
      text: 'Home'
    },
    {
      link: '/pageFinder',
      icon: FindInPageIcon,
      text: 'Position in Google'
    },
    {
      link: '/textFinder',
      icon: TextFieldsIcon,
      text: 'Repeated words'
    }
  ]
};

export default config;