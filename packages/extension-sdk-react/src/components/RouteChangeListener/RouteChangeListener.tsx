/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { ExtensionHostApi } from 'looker-extension-sdk'
import { clone } from 'lodash'
import { RouteChangeListenerProps } from './types'

export const RouteChangeListener: React.FC<RouteChangeListenerProps> = ({
  onPathnameChange,
  onRouteChange,
  extensionHost,
  hostRoute,
  hostRouteState,
}) => {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (onPathnameChange) {
      onPathnameChange(location.pathname)
    }
    if (onRouteChange) {
      onRouteChange(location.pathname + location.search, clone(location.state))
    }
    ;(extensionHost as ExtensionHostApi).clientRouteChanged(
      location.pathname + location.search,
      location.state
    )
  }, [location])

  useEffect(() => {
    if (hostRoute) {
      history.push(hostRoute, hostRouteState)
    }
  }, [hostRoute])
  return <></>
}
