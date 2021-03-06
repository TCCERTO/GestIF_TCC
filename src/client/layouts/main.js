import React, { Component } from 'react'
import Head from '~components/head'
import Header from '~components/header'
import Sidebar from '~components/sidebar'
import Footer from '~components/footer'
import Router from 'next/router'

import Auth from '~utils/AuthService'
import * as ModuleService from '~utils/ModulesService'

Router.onRouteChangeStart = () => window.Pace.start()
Router.onRouteChangeComplete = () => window.Pace.stop()
Router.onRouteChangeError = () => window.Pace.stop()

class Main extends Component {
  componentDidMount() {
    //Se não estiver autenticado, redireciona para a tela de login

    //Router.push('/inicio')
    if (!Auth.loggedIn()) {
      Router.push('/inicio')
    }
    //Se um módulo não foi escolhido, redireciona para tela de seleção de módulo. Ocorre a cada login.
    if (
      !ModuleService.isModuleChosen() &&
      Auth.loggedIn() /*opção de manter conectado estiver selecionado*/
    ) {
      Router.push('/modulos')
    }
  }
  render() {
    if (!Auth.loggedIn()) {
      return (
        <span
          className="fa-3x"
          style={{
            textAlign: 'center',
            width: '100%',
            transform: 'translate(0, -50%)',
            top: '50%',
            position: 'absolute'
          }}
        >
          <i className="fa fa-cog fa-spin" />
        </span>
      )
    }
    return (
      <div className="skin-black sidebar-mini wrapper">
        {/* Cabeçalho branco */}
        <Head />
        {/* Cabeçalho */}
        <Header auth={Auth} />
        {/* Barra lateral */}
        <Sidebar
          menu={ModuleService.getModuleMenu(ModuleService.getModule().id)}
          auth={Auth}
          module={ModuleService.getModule()}
        />
        {/* Página de /pages/ */}
        {this.props.children}
        <style jsx global>
          {`
            body {
              font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial,
                sans-serif;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Main
