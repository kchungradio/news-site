import React from 'react'

import Global from '../components/global'
import Header from '../components/header'

const wrapWithLayout = Page => (
  class WrapWithLayout extends React.Component {
    static getInitialProps (context) {
      return Page.getInitialProps
        ? Page.getInitialProps(context)
        : {}
    }

    render () {
      return (
        <div className='background'>
          <Global />

          <div className='layout'>
            <Header session={this.props.session} />
            <Page {...this.props} />
          </div>

          <style jsx>{`
            .layout {
              padding: 30px 40px;
            }
          `}</style>
        </div>
      )
    }
  }
)

export default wrapWithLayout
