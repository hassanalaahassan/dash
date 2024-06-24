import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'users benfit \'s',
    isTitle: true
  },
  {
    label: 'Users',
    icon: 'users',
    link: '/apps/Users',
  },
  {
    label: 'Ticket',
    link: '/apps/ticket',
  },
  {
    label: 'Blog',
    icon:'globe',
    link: '/apps/Blog',
    subItems: [
      {
        label: 'New Blog',
        link: '/apps/blog/new-blog',
      },
      {
        label: 'All Blogs',
        link: '/apps/blog/all-blog'
      }
    ]
  },
  {
    label: 'insight',
    icon:'layers',
    link: '/apps/insight',
    subItems: [
      {
        label: 'New insight',
        link: '/apps/insight/new-insight',
      },
      {
        label: 'All Insights',
        link: '/apps/insight/all-insight'
      }
    ]
  },
  {
    label: 'Hospital',
    isTitle: true
  },
  {
    label: 'Blood Bag',
    link: '/apps/blood-bag',
    badge: {
      variant: 'primary',
      text: 'new',
    }
  },
  {
    label: 'hospitals',
    link: '/apps/hospital',
  },
  {
    label: 'Emergency',
    icon:'truck',
    subItems: [
          {
            label: 'Create',
            link: '/apps/emergency/new-emergency',
          },
          {
            label: 'All Emergency',
            link: '/apps/emergency/All-emergency'
          }
        ]
  },
  {
    label: 'Appointment',
    icon:'calendar',
    link: '/apps/appointment',
  },
  {
    label: 'Auth',
    isTitle: true
  },
  {
    label: 'LogOut',
    icon: 'log-out',
    link: '/auth/login',
  }
];
