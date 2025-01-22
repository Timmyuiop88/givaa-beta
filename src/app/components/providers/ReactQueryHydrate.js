'use client'

import { Hydrate as RQHydrate } from '@tanstack/react-query'

export default function ReactQueryHydrate({ children, state }) {
  return <RQHydrate state={state}>{children}</RQHydrate>
} 