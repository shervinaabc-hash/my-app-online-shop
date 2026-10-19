import React from "react"

type Tcontainer={
    children: React.ReactNode
}
function Container({children}:  Tcontainer) {
  return (
    <div className="container mx-auto px-4">{children}</div>
  )
}

export default Container
