export const navigation = {
    authenticated: [
        {
            name: 'Dashboard',
            path: '/dashboard',
            hasDropDown: false,
            adminOnly: false,
        },
        {
            name: 'Admin Management ',
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
