import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { logout } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { showSuccessToast } from '../../utils/toastNotifications';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);
interface DashboardLayoutProps {
    children: React.ReactNode;
    toggleTheme: () => void;
    darkMode: boolean;
}

// Definimos un tipo para los items del menú
interface MenuItem {
    name: string;
    link: string;
    icon: React.ReactNode;
}

// Array con los items del menú
const menuItems: MenuItem[] = [
    {
        name: 'Home',
        link: `/dashboard/home`,
        icon: <HomeIcon />
    },
    {
        name: 'Users',
        link: `/private/users`,
        icon: <PeopleIcon />
    },
    {
        name: 'Socios',
        link: `/private/socios`,
        icon: <GroupsIcon />
    },
];

const settings = ['Profile', 'Account', 'Logout'];


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, toggleTheme, darkMode }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);

    const handleOpenLanguageMenu = (event: any) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleCloseLanguageMenu = () => {
        setAnchorElLanguage(null);
    };

    const handleLanguageChange = (lang: any) => {
        // Lógica para cambiar el idioma
        console.log(`Idioma cambiado a: ${lang}`);
        setAnchorElLanguage(null);
    };

    // Functions for each menu item
    const handleProfileClick = () => {
        console.log("Profile clicked");
        // Logic for profile action
    };

    const handleAccountClick = () => {
        console.log("Account clicked");
        // Logic for account action
    };
    const dispatch = useDispatch();
    const handleLogoutClick = () => {
        console.log("Logout clicked");
        // Logic for logout action
        dispatch(logout());
        showSuccessToast('¡Cierre de sesión exitoso!');
    };

    // Object mapping settings to their respective handlers
    const settingHandlers: any = {
        Profile: handleProfileClick,
        Account: handleAccountClick,
        Logout: handleLogoutClick,
    };

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            alignItems: 'start',
        }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(!open)}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 1,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& .full-text': {
                                    display: { xs: 'none', sm: 'flex' },
                                },
                                '& .short-text': {
                                    display: { xs: 'flex', sm: 'none' },
                                },
                            }}
                        >
                            <span className="full-text">Water System - Front End</span>
                            <span className="short-text">WSF</span>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Icono de Cambio de Modo */}
                        <IconButton
                            size="large"
                            onClick={toggleTheme}
                            sx={{
                                ml: 2,
                                mr: 1,
                            }}
                        >
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>

                        {/* Icono de Cambio de lenguaje */}
                        <Tooltip title="Change Language">
                            <IconButton
                                size="large"
                                onClick={handleOpenLanguageMenu}
                            >
                                <LanguageIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElLanguage}
                            open={Boolean(anchorElLanguage)}
                            onClose={handleCloseLanguageMenu}
                            sx={{ mt: '35px' }}
                        >
                            <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
                            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                        </Menu>

                        {/* Avatar y Nombre de Usuario */}
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt="User Avatar"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ width: 32, height: 32 }}
                                />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{
                                        ml: 1,
                                        display: { xs: 'none', sm: 'flex' },
                                    }}
                                >
                                    User Name
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => { settingHandlers[setting](); handleCloseUserMenu(); }}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(!open)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                                component={Link}
                                to={item.link}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{
                flexGrow: 1, p: 3,
                width: '100%',
                overflowX: 'auto'
            }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export default DashboardLayout;
