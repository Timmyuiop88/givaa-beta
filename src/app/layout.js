import { Providers } from './providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/nextAuth';

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}