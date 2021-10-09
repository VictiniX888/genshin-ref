import { PropsWithChildren } from 'react';
import Head from 'next/head';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css'
          integrity='sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU'
          crossOrigin='anonymous'
        />
      </Head>

      {children}
    </>
  );
}
