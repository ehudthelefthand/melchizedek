import { PropsWithChildren } from 'react'
import './errorPage.css'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
function ErrorPage(
  props: PropsWithChildren<{
    status: number
  }>
) {
  const { status } = props
  return (
    <div id="error-page">
      {(() => {
        switch (status) {
          case 400:
            return (
              <Result
                status="404"
                title="400"
                subTitle="Bad Request."
                extra={
                  <Link to={'/transaction'}>
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            )
          case 401:
            return (
              <Result
                status="403"
                title="401"
                subTitle="Authorization required"
                extra={
                  <Link to={'/transaction'}>
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            )
          case 403:
            return (
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                  <Link to={'/transaction'}>
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            )
          case 404:
            return (
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Link to={'/transaction'}>
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            )
          case 500:
            return (
              <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong on the server."
                extra={
                  <Link to={'/transaction'}>
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            )
          default:
            return (
              <Result
                status="500"
                title={`${status}`}
                subTitle="Sorry, something went wrong."
                extra={
                  <Link to={'/transaction'}>
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            )
        }
      })()}
    </div>
  )
}

export default ErrorPage
