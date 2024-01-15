import React, { Component, Fragment } from 'react';
//import reactstrap
import {Navbar, Nav ,NavItem , UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect, useDispatch, useSelector} from 'react-redux'
import jsCookie from 'js-cookie'
import auth_types from "../redux/reducers/types/authTypes"

function MyNavBar () {
    const authSelector = useSelector((state) => state.auth)
    // console.log(authSelector);

    const dispatch = useDispatch()

        function logOut () {
        jsCookie.remove ("user_data")

        dispatch({
            type : auth_types.Logout
        })
    }
    return(
        <div>
                <Navbar color='light' light>
                    {/* pemberian warna di navigasi pakai color */}
                    <NavbarBrand>
                        <Link to="/">Emmerce</Link>
                    </NavbarBrand>
                    <Nav>
                        {/* ternary option utk kala belum login, yg tampil link ke page login dan register, kalo udh username dan navigasi yg tampil */}
                        {
                            authSelector?.username?
                            <Fragment>
                                <NavItem>
                                    <NavbarText>Hello, {authSelector.username}</NavbarText>
                                </NavItem>
                                <UncontrolledDropdown>
                                    <DropdownToggle nav caret> 
                                    {/* nav caret agar ada tanda dropdown */}
                                        Pages
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link to="/cart">Cart </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/history">History</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/profile">Profile</Link>
                                        </DropdownItem>
                                        {/* ternaty option utk mengeluarkan gropdown admin , kalo yg login role ya admin */}
                                        {
                                            authSelector.role === "admin" ? 
                                                <DropdownItem>
                                                    <Link to="/admin">Admin</Link>
                                                </DropdownItem>
                                                :
                                                null
                                        }
                                        {/* fungsionalitas logout */}
                                        <DropdownItem divider/>
                                            <DropdownItem onClick={logOut}>
                                                Logout
                                            </DropdownItem>
                                        
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Fragment> 
                            :
                            <NavItem>
                                <NavbarText>
                                    <Link to="/">Login</Link>  |  <Link to="/register">Register</Link>
                                </NavbarText>
                            </NavItem>                          
                        }
                    </Nav>
                </Navbar>
            </div>
    )
}

export default MyNavBar