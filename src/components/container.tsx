import React from "react"

type Tcontainer={
    children: React.ReactNode
}
function Container({children}:  Tcontainer) {
  return (
    <div className="container mx-auto">{children}</div>
  )
}

export default Container