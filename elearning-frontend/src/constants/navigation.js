import { ImBook, ImUsers, ImHome } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'

export const navigation = {
    authenticated: [
        {
            name: 'Home',
            icon: <ImHome />,
            path: '/dashboard',
            hasDropDown: false,
            adminOnly: false,
        },
        {
            name: 'Admin Management ',
            icon: <MdAdminPanelSettings />,
            path: '',
            hasDropDown: true,
            adminOnly: true,
            submeu: [
                {
                    name: 'User Management',
                    path: '/admin/users',
                    hasDropDown: false,
                },
                {
                    name: 'Category Management',
                    path: '/admin/categories',
                    hasDropDown: false,
                },
                {
                    name: 'Word Management',
                    path: '/admin/words',
                    hasDropDown: false,
                },
                {
                    name: 'Edit Words',
                    path: '/admin/words/edit',
                    hasDropDown: false,
                }
            ]
        },
        {
            name: 'Users',
            icon: <ImUsers />,
            path: '/users',
            hasDropDown: false,
            adminOnly: false,
        },
        {
            name: 'Courses',
            icon: <ImBook />,
            path: '/quiz',
            hasDropDown: false,
            adminOnly: false,
        }
    ],
    unauthenticated: [
        {
            name: 'LOGIN',
            path: '/',
            hasDropDown: false
        },
        {
            name: 'REGISTER',
            path: '/register',
            hasDropDown: false
        }
    ]
}
