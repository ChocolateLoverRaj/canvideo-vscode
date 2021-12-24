import React from 'react'
import { provideFASTDesignSystem } from '@microsoft/fast-components'
import { provideReactWrapper } from '@microsoft/fast-react-wrapper'

const { wrap } = provideReactWrapper(React, provideFASTDesignSystem())

export default wrap
