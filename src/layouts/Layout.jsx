import { Fragment } from "react"
import Navigation from "../components/Navigation"

export default function Layout({ children }){
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  );
}