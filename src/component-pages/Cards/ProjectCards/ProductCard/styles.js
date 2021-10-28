/**
=========================================================
* Soft UI Dashboard Material-UI - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @material-ui core components
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ palette, boxShadows, functions, borders }) => {
  const { transparent, white } = palette
  const { regular, xl } = boxShadows
  const { pxToRem } = functions
  const { borderRadius, borderWidth } = borders

  return {
    projectCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: transparent.main,
      boxShadow: 'none',
      overflow: 'visible',
      position: 'relative'
    },

    projectCard_imageContainer: {
      boxShadow: xl,
      width: '100.25%',
      borderRadius: borderRadius.xl,
      position: 'relative'
    },

    projectCard_image: {
      maxWidth: '100%',
      margin: 0,
      boxShadow: regular,
      objectFit: 'cover',
      objectPosition: 'center'
    },

    projectCard_avatar: {
      border: `${borderWidth[2]} solid ${white.main}`,
      marginLeft: pxToRem(-12),
      cursor: 'pointer',
      position: 'relative',

      '&:hover, &:focus': {
        zIndex: '10'
      }
    },

    projectCard_stock: {
      content: '',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      background: '#0000009e',
      textAlign: 'center',
      lineHeight: '300px',
      zIndex: '100',
      color: 'white',
      borderRadius: borderRadius.xl,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    stock_img: {
      width: '70%'
    },

    icon_love: {
      width: '20px',
      fill: '#ff000036'
    },

    icon_love_active: {
      fill: 'red'
    }
  }
})
