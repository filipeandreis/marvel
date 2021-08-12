import React from 'react'
import { Link } from 'react-router-dom'
import { SideNav, SideNavItem, Icon, Divider } from 'react-materialize'

class Sidenav extends React.Component {
	render() {
		return (
			<div>
				<style>
					{`
                        #root > div > div {
                        z-index: 99999 !important;
                        }
                    `}
				</style>
				<SideNav
					id="sidenav-mobile"
					options={{
						draggable: true
					}}
					trigger={<a className="btn-sidenav" href="#!"><Icon>menu</Icon></a>}
				>
					<SideNavItem
						user={{
							background: 'images/background/mobile-menu-bg.jpg',
							name: 'Uniftec',
							email: 'Revista Acadêmica'
						}}
						userView
					/>
					<SideNavItem
						icon={<Icon>book</Icon>}
						waves={true}
					>
						<Link to='/'>
                            Clientes
						</Link>
					</SideNavItem>
					<SideNavItem
						icon={<Icon>book</Icon>}
						waves={true}
					>
						<Link to='/archives'>
                            Arquivos
						</Link>
					</SideNavItem>
					<Divider/>
					<SideNavItem
						icon={<Icon>dashboard</Icon>}
						waves={true}
					>
						<Link to='/about'>
                            Sobre a Revista
						</Link>
					</SideNavItem>
					<SideNavItem
						icon={<Icon>group</Icon>}
						waves={true}
					>
						<Link to='/editorial-team'>
                            Equipe Editorial
						</Link>
					</SideNavItem>
					<SideNavItem
						icon={<Icon>email</Icon>}
						waves={true}
					>
						<Link to='/contact'>
                            Contato
						</Link>
					</SideNavItem>
				</SideNav>
			</div>
		)
	}
}

export default Sidenav