import React from 'react'

export function useDidMountEffect(callback, deps) {
    const didMount = React.useRef(false)

    React.useEffect(() => {
        if (didMount.current) callback()
        else didMount.current = true
    }, deps)
}
