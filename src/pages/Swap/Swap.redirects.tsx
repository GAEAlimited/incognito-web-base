import { Redirect, RouteComponentProps } from 'react-router-dom';

// Redirects to swap but only replace the pathname
export function RedirectPathToSwapOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/market' }} />;
}

// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
export function RedirectToSwap(props: RouteComponentProps<{ outputCurrency: string }>) {
  const {
    location: { search },
    match: {
      params: { outputCurrency },
    },
  } = props;

  return (
    <Redirect
      to={{
        ...props.location,
        pathname: '/market',
        search:
          search && search.length > 1
            ? `${search}&outputCurrency=${outputCurrency}`
            : `?outputCurrency=${outputCurrency}`,
      }}
    />
  );
}
